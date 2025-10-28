import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodosContextType {
  todos: Todo[];
  addTodo: (title: string) => void;
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  editTodo: (id: number, title: string) => void;
  toggleAll: () => void;
  clearCompleted: () => void;
}

const TodosContext = createContext<TodosContextType | undefined>(undefined);

export const TodosProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Завантаження з localStorage
  useEffect(() => {
    const saved = localStorage.getItem('todos');

    if (saved) {
      setTodos(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title: string) => {
    const trimmed = title.trim();

    if (!trimmed) {
      return;
    }

    const newTodo: Todo = { id: +new Date(), title: trimmed, completed: false };

    setTodos(prev => [...prev, newTodo]);
  };

  const removeTodo = (id: number) =>
    setTodos(prev => prev.filter(t => t.id !== id));
  const toggleTodo = (id: number) =>
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );

  const editTodo = (id: number, title: string) => {
    const trimmed = title.trim();

    if (!trimmed) {
      removeTodo(id);

      return;
    }

    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, title: trimmed } : t)),
    );
  };

  const toggleAll = () => {
    const allCompleted = todos.every(t => t.completed);

    setTodos(prev => prev.map(t => ({ ...t, completed: !allCompleted })));
  };

  const clearCompleted = () => setTodos(prev => prev.filter(t => !t.completed));

  return (
    <TodosContext.Provider
      value={{
        todos,
        addTodo,
        removeTodo,
        toggleTodo,
        editTodo,
        toggleAll,
        clearCompleted,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodosContext);

  if (!context) {
    throw new Error('useTodos must be used within TodosProvider');
  }

  return context;
};
