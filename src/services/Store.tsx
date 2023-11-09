import React, { useMemo, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

type TodosContextProps = {
  todos: Todo[],
  setTodos: (newValue: Todo[]) => void,
  filter: Status,
  setFilter: (status: Status) => void,
  filteredTodos: Todo[],
};

export const TodosContext = React.createContext<TodosContextProps>({
  todos: [],
  setTodos: () => [],
  filter: Status.All,
  setFilter: () => {},
  filteredTodos: [],
});

type Props = {
  children: React.ReactNode,
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filter, setFilter] = useState(Status.All);

  const filterTodos = (filterStatus: Status) => {
    switch (filterStatus) {
      case Status.All:
        return todos;

      case Status.Active:
        return todos.filter(todo => !todo.completed);

      case Status.Completed:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  };

  const filteredTodos = filterTodos(filter);

  const value = useMemo(() => ({
    todos,
    setTodos,
    filter,
    setFilter,
    filteredTodos,
  }), [todos, filteredTodos]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
