import { createContext, useMemo, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

type ContextType = {
  todos: Todo[],
  setTodos: (v: Todo[]) => void,
  filterStatus: Status,
  setFilterStatus: (status: Status) => void,
  filteredTodos: Todo[],
};

const initialContext = {
  todos: [],
  setTodos: () => {},
  filterStatus: Status.All,
  setFilterStatus: () => {},
  filteredTodos: [],
};

export const TodosContext = createContext(initialContext as ContextType);

type Props = {
  children: React.ReactNode,
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [filterStatus, setFilterStatus] = useState(Status.All);

  const filteredTodos = todos.filter(todo => {
    switch (filterStatus) {
      case Status.Completed:
        return todo.completed;

      case Status.Active:
        return !todo.completed;

      default:
        return true;
    }
  });

  const value = useMemo(() => ({
    todos,
    setTodos,
    filterStatus,
    setFilterStatus,
    filteredTodos,
  }), [todos, filterStatus]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
