import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Todo } from '../types/Todo';
import { Filter } from '../types/Filter';
import {
  addTodo,
  getTodos,
  removeTodo,
  updateTodo,
  USER_ID,
} from '../api/todos';

type TodoContextValue = {
  todos: Todo[];
  filtered: Todo[];
  activeCount: number;
  completedCount: number;
  filter: Filter;
  setFilter: (f: Filter) => void;
  loading: boolean;
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

const STORAGE_KEY = 'todos';
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bootstrapped = useRef(false);
  const [isAdding, setIsAdding] = useState(false);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  // #endregion

  // localstorage после каждого изменения
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch {
      setError('Failed to save a copy todos');
    }
  }, [todos]);

  useEffect(() => {
    if (bootstrapped.current) {
      return;
    }

    bootstrapped.current = true;

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    (async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getTodos();

        setTodos(Array.isArray(data) ? data : []);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : 'Failed to load todos');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

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
      loading,
      error,
      clearError: () => setError(null),

      add: async (title: string) => {
        const trimmed = title.trim();

        if (!trimmed) {
          return;
        }

        setError(null);
        setIsAdding(true);
        const temp: Todo = {
          id: Date.now(),
          userId: USER_ID,
          title: trimmed,
          completed: false,
        };

        setTempTodo(temp);
        setTodos(prev => [...prev, temp]);

        try {
          const created = await addTodo(trimmed);

          setTodos(prev => prev.map(t => (t.id === temp.id ? created : t)));
        } catch (e) {
          setTodos(prev => prev.filter(t => t.id !== temp.id));
          setError(e instanceof Error ? e.message : 'Failed to add todo');
        } finally {
          setIsAdding(false);
          setTempTodo(null);
        }
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
      loading,
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
