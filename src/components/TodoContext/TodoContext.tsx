import React from 'react';
import { Todo } from '../../types/Todo';
import { useLocalStorage } from '../hooks/useLocalStorage';

type Props = {
  children: React.ReactNode
};

export const TodoContext = React.createContext<{
  todos: Todo[],
  setTodos(todos: Todo[]):void
}>({
      todos: [],
      setTodos: () => {},
    });

export const TodoProvider:React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage('todos', []);

  const value = {
    todos,
    setTodos,
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};
