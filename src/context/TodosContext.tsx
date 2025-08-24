import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { Todo } from '../types/todo';
import { STORAGE_KEY } from '../context/constants';

interface TodosContextValue {
  todos: Todo[];
  activeCount: number;
  allCompleted: boolean;
  addTodo: (title: string) => void;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  updateTodo: (id: number, title: string) => void;
  clearCompleted: () => void;
  toggleAll: () => void;
}

const TodosContext = createContext<TodosContextValue | undefined>(undefined);

export function useTodos() {
  const ctx = useContext(TodosContext);

  if (!ctx) {
    throw new Error('useTodos must be used within <TodosProvider>');
  }

  return ctx;
}

function loadTodos(): Todo[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    return saved ? (JSON.parse(saved) as Todo[]) : [];
  } catch {
    return [];
  }
}

export const TodosProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>(() => loadTodos());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const activeCount = useMemo(
    () => todos.filter(todo => !todo.completed).length,
    [todos],
  );

  const allCompleted = useMemo(
    () => todos.length > 0 && activeCount === 0,
    [todos, activeCount],
  );

  const addTodo = (rawTitle: string) => {
    const title = rawTitle.trim();

    if (!title) {
      return;
    }

    setTodos(prev => [...prev, { id: +new Date(), title, completed: false }]);
  };

  const deleteTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id: number) => {
    setTodos(prev =>
      prev.map(prevTodo =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo,
      ),
    );
  };

  const updateTodo = (id: number, rawTitle: string) => {
    const title = rawTitle.trim();

    if (!title) {
      deleteTodo(id);

      return;
    }

    setTodos(prev =>
      prev.map(prevTodo =>
        prevTodo.id === id ? { ...prevTodo, title } : prevTodo,
      ),
    );
  };

  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  };

  const toggleAll = () => {
    setTodos(prev => {
      const shouldCompleteAll = prev.some(todo => !todo.completed);

      return prev.map(todo => ({ ...todo, completed: shouldCompleteAll }));
    });
  };

  const value: TodosContextValue = {
    todos,
    activeCount,
    allCompleted,
    addTodo,
    deleteTodo,
    toggleTodo,
    updateTodo,
    clearCompleted,
    toggleAll,
  };

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};
