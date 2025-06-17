import React, { createContext, useContext, useEffect, useState } from 'react';
import { Todo } from './types/Todo';

type Filter = 'all' | 'active' | 'completed';

interface TodoContextType {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  addTodo: (title: string) => void;
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  updateTodo: (id: number, title: string) => void;
  toggleAll: () => void;
  clearCompleted: () => void;
  filter: Filter;
  setFilter: (filter: Filter) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodosState] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    const stored = localStorage.getItem('todos');

    if (stored) {
      setTodosState(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const setTodos = (newTodos: Todo[]) => {
    setTodosState(newTodos);
  };

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: +new Date(),
      title: title.trim(),
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const updateTodo = (id: number, title: string) => {
    const trimmed = title.trim();

    if (trimmed === '') {
      removeTodo(id);
    } else {
      setTodos(
        todos.map(todo =>
          todo.id === id ? { ...todo, title: trimmed } : todo,
        ),
      );
    }
  };

  const toggleAll = () => {
    const allCompleted = todos.every(todo => todo.completed);

    setTodos(todos.map(todo => ({ ...todo, completed: !allCompleted })));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        addTodo,
        removeTodo,
        toggleTodo,
        updateTodo,
        toggleAll,
        clearCompleted,
        filter,
        setFilter,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider');
  }

  return context;
};
