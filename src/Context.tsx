import React, { useEffect, useRef, useState } from 'react';

export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

interface ContextType {
  todos: Todo[];
  addTodo: (title: string) => void;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  clearCompleted: () => void;
  toggleAll: () => void;
  updateTodo: (id: number, title: string) => void;
  focusInput: () => void;
  setInputRef: (ref: React.RefObject<HTMLInputElement>) => void;
}

export const Context = React.createContext<ContextType>({} as ContextType);

type Props = {
  children: React.ReactNode;
};

export const ContextProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');

    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: +new Date(),
      userId: 1,
      title: title,
      completed: false,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  const deleteTodo = (id: number) => {
    const filteredTodos = todos.filter(todo => todo.id !== id);

    setTodos(filteredTodos);
  };

  const updateTodo = (id: number, title: string) => {
    const todoToUpdate = todos.map(todo =>
      todo.id === id ? { ...todo, title: title } : todo,
    );

    setTodos(todoToUpdate);
  };

  const toggleTodo = (id: number) => {
    const filteredTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }

      return todo;
    });

    setTodos(filteredTodos);
  };

  const toggleAll = () => {
    const allTodosCompleted = todos.every(todo => todo.completed);

    const updatedTodos = todos.map(todo => {
      return { ...todo, completed: !allTodosCompleted };
    });

    setTodos(updatedTodos);
  };

  const clearCompleted = () => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
  };

  const focusInput = () => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const setInputRef = (ref: React.RefObject<HTMLInputElement>) => {
    inputRef.current = ref.current;
  };

  return (
    <Context.Provider
      value={{
        todos,
        addTodo,
        deleteTodo,
        toggleTodo,
        clearCompleted,
        toggleAll,
        updateTodo,
        focusInput,
        setInputRef,
      }}
    >
      {children}
    </Context.Provider>
  );
};
