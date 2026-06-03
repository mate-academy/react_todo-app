import React, { createContext, useContext, useState, useEffect } from 'react';
import { FILTERS } from '../utils/filters';

export type FilterType = (typeof FILTERS)[keyof typeof FILTERS];

let nextId = 1;

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export type TodoContextType = {
  todos: Todo[];
  filter: FilterType;
  addTodo: (title: string) => void;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  toggleAll: () => void;
  updateTodoTitle: (id: number, title: string) => void;
  clearCompleted: () => void;
  setFilter: (filter: FilterType) => void;
  shouldFocusInput: boolean;
  setShouldFocusInput: (shouldFocus: boolean) => void;
};

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined,
);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    // busca do localStorage
    try {
      const saved = localStorage.getItem('todos');

      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [filter, setFilter] = useState<FilterType>('all');
  // salva no localStorage quando muda

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: nextId++,
      title,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  const [shouldFocusInput, setShouldFocusInput] = useState(false);

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));

    setShouldFocusInput(true);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const toggleAll = () => {
    const allCompleted = todos.every(todo => todo.completed);

    setTodos(todos.map(todo => ({ ...todo, completed: !allCompleted })));
  };

  const updateTodoTitle = (id: number, title: string) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, title } : todo)));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
    setShouldFocusInput(true);
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        filter,
        addTodo,
        deleteTodo,
        toggleTodo,
        toggleAll,
        updateTodoTitle,
        clearCompleted,
        setFilter,
        shouldFocusInput,
        setShouldFocusInput,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }

  return context;
};
