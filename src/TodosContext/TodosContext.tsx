import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Todo } from '../types/Todo';
import { TodosContextType } from '../types/TodosContextType';
import { Status } from '../types/Status';

export const TodosContext = React.createContext<TodosContextType>({
  todos: [],
  setTodos: () => {},
  filteredTodos: () => [],
  status: '',
  setStatus: () => {},
});

type Props = {
  children: React.ReactNode,
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [status, setStatus] = useState(Status.All);

  const filteredTodos = (newStatus: string) => {
    return todos.filter(todo => {
      switch (newStatus) {
        case Status.All:
          return true;

        case Status.Active:
          return !todo.completed;

        case Status.Completed:
          return todo.completed;

        default:
          return true;
      }
    });
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        setTodos,
        filteredTodos,
        status,
        setStatus,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
