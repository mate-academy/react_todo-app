import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Filter } from './types/Filter';
import { Todo } from './types/Todo';

type TodosContextValue = {
  todos: Todo[];
  visibleTodos: Todo[];
  filter: Filter;
  activeCount: number;
  completedCount: number;
  isAllCompleted: boolean;

  addTodo: (title: string) => void;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  editTodo: (id: number, newTitle: string) => void;
  clearCompleted: () => void;
  toggleAll: () => void;
  setFilter: (filter: Filter) => void;
};

const TodosContext = createContext<TodosContextValue | null>(null);

const LS_KEY = 'todos';

export const TodosProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);

      return raw ? (JSON.parse(raw) as Todo[]) : [];
    } catch {
      return [];
    }
  });

  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(todos));
  }, [todos]);

  const activeCount = useMemo(
    () => todos.filter(t => !t.completed).length,
    [todos],
  );
  const completedCount = useMemo(
    () => todos.length - activeCount,
    [todos, activeCount],
  );
  const isAllCompleted = todos.length > 0 && completedCount === todos.length;

  const visibleTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(t => !t.completed);
      case 'completed':
        return todos.filter(t => t.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const addTodo = (title: string) => {
    const trimmed = title.trim();

    if (!trimmed) {
      return;
    }

    setTodos(prev => [
      ...prev,
      {
        id: Date.now(),
        title: trimmed,
        completed: false,
      },
    ]);
  };

  const toggleTodo = (id: number) => {
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const removeTodo = (id: number) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  const editTodo = (id: number, newTitle: string) => {
    const trimmed = newTitle.trim();

    setTodos(prev =>
      trimmed
        ? prev.map(t => (t.id === id ? { ...t, title: trimmed } : t))
        : prev.filter(t => t.id !== id),
    );
  };

  const clearCompleted = () => {
    setTodos(prev => prev.filter(t => !t.completed));
  };

  const toggleAll = () => {
    setTodos(prev => {
      const makeCompleted = !prev.every(t => t.completed);

      return prev.map(t => ({ ...t, completed: makeCompleted }));
    });
  };

  const value: TodosContextValue = {
    todos,
    visibleTodos,
    filter,
    activeCount,
    completedCount,
    isAllCompleted,
    addTodo,
    toggleTodo,
    removeTodo,
    editTodo,
    clearCompleted,
    toggleAll,
    setFilter,
  };

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};

export const useTodos = () => {
  const ctx = useContext(TodosContext);

  if (!ctx) {
    throw new Error('useTodos must be used within TodosProvider');
  }

  return ctx;
};
