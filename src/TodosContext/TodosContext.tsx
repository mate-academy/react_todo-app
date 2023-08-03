import React, { useState } from 'react';
import { Todo } from '../Types/Todo';
import { useLocalStorage } from '../hooks/UseLocalStorege';
import { Status } from '../Types/Status';

type TodosContextProps = {
  todos: Todo[];
  setTodos: (v: Todo[]) => void;
  selectedStatus: Status;
  setSelectedStatus: (v: Status) => void;
  handleStatus: (v: Status) => void;
  filteredTodos: Todo[];
};

export const TodosContext = React.createContext<TodosContextProps>({
  todos: [],
  setTodos: () => { },
  selectedStatus: Status.ALL,
  setSelectedStatus: () => { },
  handleStatus: () => { },
  filteredTodos: [],
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [selectedStatus, setSelectedStatus] = useState(Status.ALL);

  const handleStatus = (status: Status) => {
    setSelectedStatus(status);
  };

  const handleFilterTodos = (status: Status, filterTodos: Todo[]) => {
    switch (status) {
      case Status.ALL:
        return filterTodos;

      case Status.ACTIVE:
        return filterTodos.filter(todo => todo.completed === false);

      case Status.COMPLETED:
        return filterTodos.filter(todo => todo.completed === true);

      default:
        return filterTodos;
    }
  };

  const filteredTodos = handleFilterTodos(selectedStatus, todos);

  const value = {
    todos,
    setTodos,
    selectedStatus,
    setSelectedStatus,
    filteredTodos,
    handleStatus,
  };

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
