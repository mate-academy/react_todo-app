import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';

export const FILTERS = {
  all: 'all',
  active: 'active',
  completed: 'completed',
} as const;

export type FilterType = (typeof FILTERS)[keyof typeof FILTERS];

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoContextType {
  todos: Todo[];
  visibleTodos: Todo[];
  filter: FilterType;
  setFilter: (f: FilterType) => void;
  addTodo: (title: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (id: number, title: string) => void;
  clearCompleted: () => void;
  toggleAll: () => void;
  activeCount: number;
  hasCompleted: boolean;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>(() =>
    JSON.parse(localStorage.getItem('todos') || '[]'),
  );
  const [filter, setFilter] = useState<FilterType>(FILTERS.all);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const activeCount = useMemo(
    () => todos.filter(t => !t.completed).length,
    [todos],
  );
  const hasCompleted = useMemo(() => todos.some(t => t.completed), [todos]);

  const visibleTodos = useMemo(
    () =>
      todos.filter(todo => {
        if (filter === FILTERS.active) {
          return !todo.completed;
        }

        if (filter === FILTERS.completed) {
          return todo.completed;
        }

        return true;
      }),
    [todos, filter],
  );

  const addTodo = useCallback((title: string) => {
    setTodos(prev => [...prev, { id: Date.now(), title, completed: false }]);
  }, []);

  const deleteTodo = useCallback((id: number) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  }, []);

  const toggleTodo = useCallback((id: number) => {
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  }, []);

  const updateTodo = useCallback((id: number, title: string) => {
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, title } : t)));
  }, []);

  const toggleAll = useCallback(() => {
    const allDone = todos.length > 0 && todos.every(t => t.completed);

    setTodos(prev => prev.map(t => ({ ...t, completed: !allDone })));
  }, [todos]);

  const clearCompleted = useCallback(() => {
    setTodos(prev => prev.filter(t => !t.completed));
  }, []);

  const value = {
    todos,
    visibleTodos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    clearCompleted,
    toggleAll,
    activeCount,
    hasCompleted,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodos = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('useTodos must be used within TodoProvider');
  }

  return context;
};
