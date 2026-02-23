import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  getTodos as apiGetTodos,
  createTodo as apiCreateTodo,
  changeTodoStatus as apiChangeTodoStatus,
  deleteTodo as apiDeleteTodo,
  editTodo as apiEditTodo,
  USER_ID,
} from '../api/todos';

import { Todo } from '../types/Todo';
import { FilterType } from '../types/Filter';

type Mode = 'api' | 'local';

interface TodosContextValue {
  todos: Todo[];
  filteredTodos: Todo[];
  filter: FilterType;
  setFilter: (f: FilterType) => void;
  inputValue: string;
  setInputValue: (v: string) => void;
  isLoading: boolean;
  loadingTodoIds: Set<number>;
  addTodo: (title: string) => Promise<void>;
  updateTodo: (id: number, completed: boolean) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
  editTodo: (id: number, title: string) => Promise<void>;
  toggleAll: () => void;
  clearCompleted: () => void;
  mode: Mode;
  setMode: (m: Mode) => void;
  onFocusInput: () => void;
  registerFocus: (fn: () => void) => void;
  error: string;
  setError: (msg: string) => void;
}

const TodosContext = createContext<TodosContextValue | undefined>(undefined);

const LS_KEY = 'todos';

type TodosProviderProps = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<TodosProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingTodoIds, setLoadingTodoIds] = useState<Set<number>>(new Set());
  const [mode, setMode] = useState<Mode>('local');
  const [error, setError] = useState<string>('');
  const focusRef = React.useRef<(() => void) | null>(null);

  const registerFocus = (fn: () => void) => {
    focusRef.current = fn;
  };

  const addLoadingIds = (ids: number[]) => {
    if (ids.length === 0) {
      return;
    }

    setLoadingTodoIds(prev => new Set([...Array.from(prev), ...ids]));
  };

  const removeLoadingIds = (ids: number[]) => {
    if (ids.length === 0) {
      return;
    }

    setLoadingTodoIds(prev => {
      const next = new Set(prev);

      ids.forEach(id => next.delete(id));

      return next;
    });
  };

  // Load todos depending on mode
  useEffect(() => {
    const loadLocal = () => {
      try {
        const raw = localStorage.getItem(LS_KEY);
        const parsed: Todo[] = raw ? JSON.parse(raw) : [];

        setTodos(parsed || []);
      } catch {
        setTodos([]);
      }
    };

    if (mode === 'api') {
      apiGetTodos()
        .then(fetched => setTodos(fetched))
        .catch(() => loadLocal());
    } else {
      loadLocal();
    }
  }, [mode]);

  // Persist every change to localStorage
  useEffect(() => {
    if (mode !== 'local') {
      return;
    }

    try {
      localStorage.setItem(LS_KEY, JSON.stringify(todos));
    } catch {
      // ignore
    }
  }, [todos, mode]);

  // Handle filter changes based on URL has
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(2) || 'all';

      setFilter(hash as FilterType);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (!error) {
      return;
    }

    const timer = setTimeout(() => setError(''), 3000);

    return () => clearTimeout(timer);
  }, [error]);

  const addTodo = (title: string) => {
    const trimmed = title.trim();

    if (!trimmed) {
      setError('Title should not be empty');

      return Promise.resolve();
    }

    if (mode === 'api') {
      const temp: Todo = {
        id: 0,
        userId: USER_ID,
        title: trimmed,
        completed: false,
      };

      setIsLoading(true);
      setTodos(prev => [...prev, temp]);

      return apiCreateTodo(trimmed)
        .then(newTodo => {
          setTodos(prev => prev.map(t => (t.id === 0 ? newTodo : t)));
          setInputValue('');
        })
        .catch(err => {
          setTodos(prev => prev.filter(t => t.id !== 0));
          throw err;
        })
        .finally(() => setIsLoading(false));
    }

    // local mode
    const newTodo: Todo = {
      id: +new Date(),
      userId: USER_ID,
      title: trimmed,
      completed: false,
    };

    setTodos(prev => [...prev, newTodo]);
    setInputValue('');

    return Promise.resolve();
  };

  const updateTodo = (id: number, completed: boolean) => {
    if (mode === 'api') {
      return apiChangeTodoStatus(id, completed)
        .then(updated => {
          setTodos(prev => prev.map(t => (t.id === id ? updated : t)));
        })
        .catch(err => {
          throw err;
        });
    }

    setTodos(prev => prev.map(t => (t.id === id ? { ...t, completed } : t)));

    return Promise.resolve();
  };

  const deleteTodo = (id: number) => {
    if (mode === 'api') {
      return apiDeleteTodo(id)
        .then(() => setTodos(prev => prev.filter(t => t.id !== id)))
        .catch(err => {
          throw err;
        });
    }

    setTodos(prev => prev.filter(t => t.id !== id));

    return Promise.resolve();
  };

  const editTodo = (id: number, title: string) => {
    const trimmed = title.trim();

    if (mode === 'api') {
      return apiEditTodo(id, trimmed).then(updated => {
        setTodos(prev =>
          prev.map(t => (t.id === id ? { ...updated, title: trimmed } : t)),
        );
      });
    }

    if (!trimmed) {
      setTodos(prev => prev.filter(t => t.id !== id));

      return Promise.resolve();
    }

    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, title: trimmed } : t)),
    );

    return Promise.resolve();
  };

  const toggleAll = () => {
    const allCompleted = todos.every(t => t.completed);
    const newCompleted = !allCompleted;

    const idsToUpdate = todos
      .filter(t => t.completed !== newCompleted)
      .map(t => t.id);

    addLoadingIds(idsToUpdate);

    const promises = todos.map(todo =>
      todo.completed === newCompleted
        ? Promise.resolve()
        : updateTodo(todo.id, newCompleted),
    );

    Promise.allSettled(promises).finally(() => removeLoadingIds(idsToUpdate));
  };

  const clearCompleted = () => {
    const completedIds = todos.filter(t => t.completed).map(t => t.id);

    if (completedIds.length === 0) {
      return Promise.resolve();
    }

    addLoadingIds(completedIds);

    const promises = completedIds.map(id => deleteTodo(id));

    return Promise.allSettled(promises).then(results => {
      removeLoadingIds(completedIds);

      if (!results.some(r => r.status === 'rejected')) {
        focusRef.current?.();
      }
    });
  };

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(t => !t.completed);
      case 'completed':
        return todos.filter(t => t.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const onFocusInput = () => {
    focusRef.current?.();
  };

  const value: TodosContextValue = {
    todos,
    filteredTodos,
    filter,
    setFilter,
    inputValue,
    setInputValue,
    isLoading,
    loadingTodoIds,
    addTodo,
    updateTodo,
    deleteTodo,
    editTodo,
    toggleAll,
    clearCompleted: () => {
      void clearCompleted();
    },
    mode,
    setMode,
    onFocusInput,
    registerFocus,
    error,
    setError,
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

export default TodosContext;
