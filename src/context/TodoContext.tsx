import React, { createContext, useContext, useState, useEffect } from 'react';
import { Todo, FilterStatus } from '../types/Todo';

interface TodoContextType {
  todos: Todo[];
  addTodo: (title: string) => void;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  updateTodo: (id: number, title: string) => void;
  toggleAll: () => void;
  clearCompleted: () => void;
  filter: FilterStatus;
  filteredTodos: Todo[];
  errorMessage: string;
  setErrorMessage: (msg: string) => void;
  deletingTodos: Todo[];
}

const TodoContext = createContext<TodoContextType | null>(null);

function getFilterFromHash(): FilterStatus {
  const hash = window.location.hash;

  if (hash === '#/active') {
    return FilterStatus.Active;
  }

  if (hash === '#/completed') {
    return FilterStatus.Completed;
  }

  return FilterStatus.All;
}

function loadTodosFromStorage(): Todo[] {
  try {
    const stored = localStorage.getItem('todos');

    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>(loadTodosFromStorage);
  const [filter, setFilter] = useState<FilterStatus>(getFilterFromHash);
  const [errorMessage, setErrorMessage] = useState('');
  const [deletingTodos, setDeletingTodos] = useState<Todo[]>([]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const handleHashChange = () => {
      setFilter(getFilterFromHash());
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const addTodo = (title: string) => {
    const trimmed = title.trim();

    if (!trimmed) {
      setErrorMessage('Title should not be empty');

      return;
    }

    setTodos(prev => [
      ...prev,
      {
        id: +new Date(),
        title: trimmed,
        completed: false,
      },
    ]);
  };

  const deleteTodo = (id: number) => {
    const todoToDelete = todos.find(t => t.id === id);

    setTodos(prev => prev.filter(todo => todo.id !== id));

    if (todoToDelete) {
      setDeletingTodos(prev => [...prev, todoToDelete]);

      setTimeout(() => {
        setDeletingTodos(prev => prev.filter(t => t.id !== id));
      }, 300);
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const updateTodo = (id: number, title: string) => {
    const trimmed = title.trim();

    if (!trimmed) {
      deleteTodo(id);

      return;
    }

    setTodos(prev =>
      prev.map(todo => (todo.id === id ? { ...todo, title: trimmed } : todo)),
    );
  };

  const toggleAll = () => {
    const allCompleted = todos.every(todo => todo.completed);

    setTodos(prev => prev.map(todo => ({ ...todo, completed: !allCompleted })));
  };

  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === FilterStatus.Active) {
      return !todo.completed;
    }

    if (filter === FilterStatus.Completed) {
      return todo.completed;
    }

    return true;
  });

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        deleteTodo,
        toggleTodo,
        updateTodo,
        toggleAll,
        clearCompleted,
        filter,
        filteredTodos,
        errorMessage,
        setErrorMessage,
        deletingTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export function useTodoContext(): TodoContextType {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }

  return context;
}
