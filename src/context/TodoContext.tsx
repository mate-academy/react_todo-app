import React, { createContext, useEffect, useState } from 'react';
import { Todo } from '../type/Todo';

interface TodoProviderProps {
  children: React.ReactNode;
}

export const TodoContext = createContext<{
  todos: Todo[];
  addTodo: (title: string) => void;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  editTodo: (id: number, title: string) => void;
  clearCompleted: () => void;
  toggleAll: (checked: boolean) => void;
} | null>(null);

export function TodoProvider({ children }: TodoProviderProps) {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const fromStorage = localStorage.getItem('todos');

    return fromStorage ? JSON.parse(fromStorage) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      title,
      id: +new Date(),
      completed: false,
    };

    setTodos(prev => [...prev, newTodo]);
  };

  const deleteTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const editTodo = (id: number, title: string) => {
    setTodos(prev =>
      prev.map(todo => (todo.id === id ? { ...todo, title } : todo)),
    );
  };

  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  };

  const toggleAll = (allCompleted: boolean) => {
    setTodos(todos.map(todo => ({ ...todo, completed: !allCompleted })));
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        deleteTodo,
        toggleTodo,
        editTodo,
        clearCompleted,
        toggleAll,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
