import React, { createContext, useContext, useEffect, useState } from 'react';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodosContextProps {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
  addTodo: (title: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  clearCompleted: () => void;
  toggleAll: () => void;
  setFilter: (filter: 'all' | 'active' | 'completed') => void;
  updateTodoTitle: (id: number, title: string) => void;
}

const TodosContext = createContext<TodosContextProps | null>(null);

export const TodosProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');

    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title: string) => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    const newTodo = { id: Date.now(), title: trimmedTitle, completed: false };

    setTodos(prev => [...prev, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  };

  const toggleAll = () => {
    const allCompleted = todos.every(todo => todo.completed);

    setTodos(prev => prev.map(todo => ({ ...todo, completed: !allCompleted })));
  };

  const updateTodoTitle = (id: number, title: string) => {
    const trimmedTitle = title.trim();

    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, title: trimmedTitle } : todo,
      ),
    );
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        filter,
        addTodo,
        toggleTodo,
        deleteTodo,
        clearCompleted,
        toggleAll,
        setFilter,
        updateTodoTitle,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = (): TodosContextProps => {
  const context = useContext(TodosContext);

  if (!context) {
    throw new Error(
      'useTodos потрібно використовувати всередині TodosProvider',
    );
  }

  return context;
};
