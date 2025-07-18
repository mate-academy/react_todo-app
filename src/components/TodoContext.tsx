import { createContext, useCallback, useEffect, useRef, useState } from 'react';
import { Todo } from '../types/Todo';
import {
  getTodosFromLocalStorage,
  saveTodosToLocalStorage,
} from '../utils/localStorage';

type TodoContextType = {
  todos: Todo[];
  addTodo: (title: string) => void;
  removeTodo: (id: number) => void;
  toggleTodoComplete: (id: number) => void;
  updateTodoTitle: (id: number, newTitle: string) => void;
  removeAllCompleted: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
  hasTodos: boolean;
};

export const TodoContext = createContext<TodoContextType>({
  todos: [],
  addTodo: () => {},
  removeTodo: () => {},
  toggleTodoComplete: () => {},
  updateTodoTitle: () => {},
  removeAllCompleted: () => {},
  inputRef: {} as React.RefObject<HTMLInputElement>,
  hasTodos: getTodosFromLocalStorage().length > 0,
});

type TodoProviderProps = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(() => getTodosFromLocalStorage());
  const inputRef = useRef<HTMLInputElement>(null);
  const hasTodos = todos.length > 0;

  useEffect(() => {
    saveTodosToLocalStorage(todos);
  }, [todos]);

  const addTodo = useCallback((title: string) => {
    const todoData = {
      title,
      completed: false,
      id: +new Date(),
    };

    setTodos(prevTodos => [...prevTodos, todoData]);
    inputRef.current?.focus();
  }, []);

  const toggleTodoComplete = useCallback((id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
    inputRef.current?.focus();
  }, []);

  const removeTodo = useCallback((id: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    inputRef.current?.focus();
  }, []);

  const updateTodoTitle = useCallback((id: number, newTitle: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, title: newTitle.trim() } : todo,
      ),
    );
  }, []);

  const removeAllCompleted = useCallback(() => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
    inputRef.current?.focus();
  }, []);

  const contextValue: TodoContextType = {
    todos,
    addTodo,
    removeTodo,
    toggleTodoComplete,
    updateTodoTitle,
    removeAllCompleted,
    inputRef,
    hasTodos,
  };

  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
};
