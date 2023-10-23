import React, { useContext, useEffect, useState } from 'react';
import { Todo } from './types/todo';

interface TodosContextType {
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

export const TodosContext = React.createContext({} as TodosContextType);

type Props = {
  children: React.ReactNode,
};

export const TodosContextProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const todosStorage = localStorage.getItem('todos');

    setTodos(JSON.parse(todosStorage || '[]') as Todo[]);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos',
      JSON.stringify(todos));
  }, [todos]);

  const value = {
    todos,
    setTodos,
  };

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => {
  return useContext(TodosContext);
};
