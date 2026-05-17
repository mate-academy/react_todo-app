import React, { createContext, useContext, useRef, useState } from 'react';
import { TodoType } from '../types/TodoType';

interface TodosContextType {
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[] | []>>;
  inputFocus: React.MutableRefObject<HTMLInputElement | null>;
}

const TodosContext = createContext<TodosContextType | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<TodoType[] | []>([]);
  const inputFocus = useRef<HTMLInputElement | null>(null);

  return (
    <TodosContext.Provider value={{ todos, setTodos, inputFocus }}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodosContext);

  if (!context) {
    throw new Error('Error finding context');
  }

  return context;
};
