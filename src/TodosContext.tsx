import React, { useState } from 'react';
import { Todo } from './types/todo';

interface TodosContextType {
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

export const TodosContext = React.createContext({} as TodosContextType);

type Props = {
  children: React.ReactNode,
};

// [JSON.parse(localStorage.getItem('todos')
//   || '{}')] as Todo[],

export const TodosContextProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

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
