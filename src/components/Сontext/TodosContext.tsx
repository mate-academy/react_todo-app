import React, { createContext, useContext, useEffect, useState } from 'react';
import { Filter } from '../../types/Filter';
import { Todo } from '../../types/Todo';

type TodosContextType = {
  todos: Todo[];
  addTodo: (title: string) => void;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  updateTodo: (id: number, title: string) => void;
  clearCompleted: () => void;
  toggleAll: () => void;
  filter: Filter;
  setFilter: (filter: Filter) => void;
};

const TodosContext = createContext<TodosContextType | undefined>(undefined);

export const useTodos = () => {
  const ctx = useContext(TodosContext);

  if (!ctx) {
    throw new Error('useTodos must be used within TodosProvider');
  }

  return ctx;
};

export const TodosProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');

    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState<Filter>(Filter.All);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: +new Date(),
      title: title.trim(),
      completed: false,
      userId: 0,
    };

    if (newTodo.title) {
      setTodos(prev => [...prev, newTodo]);
    }
  };

  const deleteTodo = (id: number) =>
    setTodos(prev => prev.filter(todo => todo.id !== id));
  const toggleTodo = (id: number) =>
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  const updateTodo = (id: number, title: string) =>
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, title: title.trim() } : todo,
      ),
    );
  const clearCompleted = () =>
    setTodos(prev => prev.filter(todo => !todo.completed));
  const toggleAll = () => {
    const allCompleted = todos.every(todo => todo.completed);

    setTodos(prev => prev.map(todo => ({ ...todo, completed: !allCompleted })));
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        addTodo,
        deleteTodo,
        toggleTodo,
        updateTodo,
        clearCompleted,
        toggleAll,
        filter,
        setFilter,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
