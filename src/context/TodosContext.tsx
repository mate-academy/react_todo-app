import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Todo } from '../types/Todo';

export interface TodosContextType {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  focusHeaderInput: () => void;
  mainInputRef: React.RefObject<HTMLInputElement>;
}

export const TodosContext = createContext<TodosContextType | null>(null);

export const TodosProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const mainInputRef = useRef<HTMLInputElement>(null);

  const focusHeaderInput = useCallback(() => {
    mainInputRef.current?.focus();
  }, []);

  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const storedTodos = localStorage.getItem('todos');

      if (storedTodos) {
        return JSON.parse(storedTodos) as Todo[];
      }

      return [];
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {}
  }, [todos]);

  return (
    <TodosContext.Provider
      value={{ todos, setTodos, focusHeaderInput, mainInputRef }}
    >
      {children}
    </TodosContext.Provider>
  );
};
