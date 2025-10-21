import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Todo } from '../types/Todo';
import { Filter } from '../types/Filter';
import { removeTodo, STORAGE_KEY, updateTodo } from '../api/todos';

type TodoContextValue = {
  todos: Todo[];
  filtered: Todo[];
  activeCount: number;
  completedCount: number;
  filter: Filter;
  setFilter: (f: Filter) => void;
  error: string | null;
  clearError: () => void;
  add: (title: string) => Promise<void>;
  remove: (id: number) => Promise<void>;
  toggle: (id: number) => Promise<void>;
  rename: (id: number, title?: string) => Promise<void>;
  clearCompleted: () => Promise<void>;
  toggleAll: () => Promise<void>;
  isAdding: boolean;
  tempTodo: Todo | null;
};

declare global {
  interface Window {
    Cypress?: unknown;
  }
}

// const isTestEnv =
//   (typeof window !== 'undefined' && typeof window.Cypress !== 'undefined') ||
//   process.env.NODE_ENV === 'test';

const TodoContext = createContext<TodoContextValue | undefined>(undefined);

export function TodoProvider({ children }: { children: ReactNode }) {
  // #region state
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);

      if (raw) {
        return JSON.parse(raw) as Todo[];
      } else {
        return [];
      }
    } catch {
      return [];
    }
  });

  const [filter, setFilter] = useState<Filter>('all');
  const [error, setError] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  // #endregion

  // localstorage
  // useEffect(() => {
  //   if (isTestEnv) {
  //     try {
  //       localStorage.removeItem(STORAGE_KEY);
  //       setTodos([]);
  //     } catch (e) {
  //       // eslint-disable-next-line no-console
  //       console.warn('Failed to clear localStorage before test:', e);
  //     }
  //   } else {
  //     try {
  //       const raw = localStorage.getItem(STORAGE_KEY);

  //       if (!raw) {
  //         return;
  //       }

  //       const parsed: unknown = JSON.parse(raw);

  //       if (Array.isArray(parsed)) {
  //         setTodos(parsed as Todo[]);
  //       }
  //     } catch (e: unknown) {
  //       setError(
  //         e instanceof Error
  //           ? e.message
  //           : 'Failed to load todos from localStorage',
  //       );
  //     }
  //   }
  // }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (e: unknown) {
      setError(
        e instanceof Error ? e.message : 'Failed to save todos to localStorage',
      );
    }
  }, [todos]);

  const activeTodos = todos.filter(t => !t.completed);
  const activeCount = activeTodos.length;
  const completedCount = todos.length - activeCount;
  const filtered =
    filter === 'active'
      ? activeTodos
      : filter === 'completed'
        ? todos.filter(t => t.completed)
        : todos;

  useEffect(() => {
    const apply = () => {
      const hash = window.location.hash.replace('#/', '');

      if (hash === 'active' || hash === 'completed' || hash === '') {
        setFilter((hash as Filter) || 'all');
      }
    };

    apply();

    window.addEventListener('hashchange', apply);

    return () => window.removeEventListener('hashchange', apply);
  }, []);

  const value = useMemo<TodoContextValue>(
    () => ({
      todos,
      filtered,
      activeCount,
      completedCount,
      isAdding,
      tempTodo,
      filter,
      setFilter: (f: Filter) => {
        setFilter(f);
      },
      error,
      clearError: () => setError(null),

      add: async (title: string) => {
        const trimmed = title.trim();

        if (!trimmed) {
          return;
        }

        const temp: Todo = {
          id: Date.now(),
          userId: 0,
          title: trimmed,
          completed: false,
        };

        setTempTodo(temp);

        setTodos(prev => [...prev, temp]);

        setIsAdding(false);
        setTempTodo(null);
      },

      remove: async (id: number) => {
        setError(null);
        const snapshot = todos;

        setTodos(prev => prev.filter(t => t.id !== id));
        try {
          await removeTodo(id);
        } catch (e) {
          setTodos(snapshot);
          setError(e instanceof Error ? e.message : 'Failed to delete todo');
        }

        return;
      },

      toggle: async (id: number) => {
        setError(null);
        const target = todos.find(t => t.id === id);

        if (!target) {
          return;
        }

        const next = !target.completed;
        const snapshot = todos;

        setTodos(prev =>
          prev.map(t => (t.id === id ? { ...t, completed: next } : t)),
        );

        try {
          await updateTodo(id, { completed: next });
        } catch (e) {
          setTodos(snapshot);
          setError(e instanceof Error ? e.message : 'Failed to toggle todo');
        }
      },

      rename: async (id: number, title?: string) => {
        const t = title?.trim();

        if (!t) {
          const snapshot = todos;

          setTodos(prev => prev.filter(x => x.id !== id));
          try {
            await removeTodo(id);
          } catch (e) {
            setTodos(snapshot);
            setError(
              e instanceof Error
                ? e.message
                : 'Failed to delete empty-titled todo',
            );
          }

          return;
        }

        setError(null);
        const snapshot = todos;

        setTodos(prev => prev.map(x => (x.id === id ? { ...x, title: t } : x)));
        try {
          await updateTodo(id, { title: t });
        } catch (e) {
          setTodos(snapshot);
          setError(e instanceof Error ? e.message : 'Failed to update title');
        }
      },

      clearCompleted: async () => {
        if (completedCount === 0) {
          return;
        }

        setError(null);
        const snapshot = todos;
        const done = snapshot.filter(t => t.completed);

        setTodos(prev => prev.filter(t => !t.completed));

        try {
          await Promise.allSettled(done.map(t => removeTodo(t.id)));
        } catch (e) {
          setTodos(snapshot);
          setError(
            e instanceof Error ? e.message : 'Failed to clear completed',
          );
        }
      },

      toggleAll: async () => {
        if (todos.length === 0) {
          return;
        }

        const allCompleted = todos.every(t => t.completed);
        const next = !allCompleted;

        setError(null);
        const snapshot = todos;

        setTodos(prev => prev.map(t => ({ ...t, completed: next })));
        try {
          await Promise.all(
            snapshot.map(t => updateTodo(t.id, { completed: next })),
          );
        } catch (e) {
          setTodos(snapshot);
          setError(e instanceof Error ? e.message : 'Failed to toggle all');
        }
      },
    }),
    [
      todos,
      filtered,
      activeCount,
      completedCount,
      error,
      filter,
      isAdding,
      tempTodo,
    ],
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export function useTodos() {
  const ctx = useContext(TodoContext);

  if (!ctx) {
    throw new Error('useTodos must be used within TodoProvider');
  }

  return ctx;
}
