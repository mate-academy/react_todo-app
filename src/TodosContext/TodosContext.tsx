import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Todo } from '../types/Todo';
import { TodosContextType } from '../types/TodosContextType';

export const TodosContext = React.createContext<TodosContextType>({
  todos: [],
  setTodos: () => {},
});

type Props = {
  children: React.ReactNode,
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);

  return (
    <TodosContext.Provider
      value={{ todos, setTodos }}
    >
      {children}
    </TodosContext.Provider>
  );
};
