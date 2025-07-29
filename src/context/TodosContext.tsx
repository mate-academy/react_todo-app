import React, { createContext, useEffect, useRef, useState } from 'react';
import { Todo } from '../types/Todo';

interface TodosContextType {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  focusNewTodoInput: () => void;
  registerNewTodoInputRef: (ref: React.RefObject<HTMLInputElement>) => void;
}

export const TodosContext = createContext<TodosContextType>({
  todos: [],
  setTodos: () => {},
  focusNewTodoInput: () => {},
  registerNewTodoInputRef: () => {},
});

type ProviderProps = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<ProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');

    return saved ? JSON.parse(saved) : [];
  });

  const newTodoInputRef = useRef<HTMLInputElement | null>(null);

  const registerNewTodoInputRef = (ref: React.RefObject<HTMLInputElement>) => {
    newTodoInputRef.current = ref.current;
  };

  const focusNewTodoInput = () => {
    newTodoInputRef.current?.focus();
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <TodosContext.Provider
      value={{ todos, setTodos, registerNewTodoInputRef, focusNewTodoInput }}
    >
      {children}
    </TodosContext.Provider>
  );
};
