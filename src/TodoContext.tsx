import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Todo } from './types/Todo';

export type { Todo };

interface TodoContextType {
  todos: Todo[];
  addTodo: (title: string) => void;
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  toggleAll: () => void;
  clearCompleted: () => void;
  updateTodoTitle: (id: number, title: string) => void;
}

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined,
);

export const TodoProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');

    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title: string) => {
    const trimmed = title.trim();

    if (!trimmed) {
      return;
    }

    const newTodo: Todo = {
      id: +new Date(),
      title: trimmed,
      completed: false,
    };

    setTodos(prev => [...prev, newTodo]);
  };

  const removeTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const toggleAll = () => {
    const allCompleted = todos.every(todo => todo.completed);

    setTodos(prev => prev.map(todo => ({ ...todo, completed: !allCompleted })));
  };

  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  };

  const updateTodoTitle = (id: number, title: string) => {
    const trimmed = title.trim();

    if (!trimmed) {
      removeTodo(id);
    } else {
      setTodos(prev =>
        prev.map(todo => (todo.id === id ? { ...todo, title: trimmed } : todo)),
      );
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        removeTodo,
        toggleTodo,
        toggleAll,
        clearCompleted,
        updateTodoTitle,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
