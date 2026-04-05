import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { FilterStatus, Todo } from '../types/Todo';

// ─── Shape of the context ────────────────────────────────────────────────────

interface TodoContextType {
  todos: Todo[];
  filter: FilterStatus;
  filteredTodos: Todo[];
  activeTodosCount: number;
  hasCompletedTodos: boolean;
  allCompleted: boolean;
  newTodoInputRef: React.RefObject<HTMLInputElement>;
  setFilter: (filter: FilterStatus) => void;
  addTodo: (title: string) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (id: number, changes: Partial<Omit<Todo, 'id'>>) => void;
  toggleTodo: (id: number) => void;
  toggleAll: () => void;
  clearCompleted: () => void;
}

// ─── Context creation ─────────────────────────────────────────────────────────

const TodoContext = createContext<TodoContextType | null>(null);

// ─── localStorage helpers ─────────────────────────────────────────────────────

const STORAGE_KEY = 'todos';

function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    return raw ? (JSON.parse(raw) as Todo[]) : [];
  } catch {
    return [];
  }
}

function saveTodos(todos: Todo[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// ─── Provider ─────────────────────────────────────────────────────────────────

interface TodoProviderProps {
  children: React.ReactNode;
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(loadTodos);
  const [filter, setFilter] = useState<FilterStatus>('all');
  const newTodoInputRef = useRef<HTMLInputElement>(null);

  // Persist to localStorage after every change
  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  // ── Derived values ──────────────────────────────────────────────────────────

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const activeTodosCount = useMemo(
    () => todos.filter(todo => !todo.completed).length,
    [todos],
  );

  const hasCompletedTodos = useMemo(
    () => todos.some(todo => todo.completed),
    [todos],
  );

  const allCompleted = useMemo(
    () => todos.length > 0 && todos.every(todo => todo.completed),
    [todos],
  );

  // ── Actions ─────────────────────────────────────────────────────────────────

  const addTodo = useCallback((title: string) => {
    const trimmed = title.trim();

    if (!trimmed) {
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

    if (newTodoInputRef.current) {
      newTodoInputRef.current.value = '';
    }
  }, []);

  const deleteTodo = useCallback((id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  const updateTodo = useCallback(
    (id: number, changes: Partial<Omit<Todo, 'id'>>) => {
      setTodos(prev =>
        prev.map(todo => (todo.id === id ? { ...todo, ...changes } : todo)),
      );
    },
    [],
  );

  const toggleTodo = useCallback((id: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }, []);

  const toggleAll = useCallback(() => {
    setTodos(prev => {
      const shouldComplete = prev.some(todo => !todo.completed);

      return prev.map(todo => ({ ...todo, completed: shouldComplete }));
    });
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  }, []);

  // ── Context value ───────────────────────────────────────────────────────────

  const value = useMemo<TodoContextType>(
    () => ({
      todos,
      filter,
      filteredTodos,
      activeTodosCount,
      hasCompletedTodos,
      allCompleted,
      newTodoInputRef,
      setFilter,
      addTodo,
      deleteTodo,
      updateTodo,
      toggleTodo,
      toggleAll,
      clearCompleted,
    }),
    [
      todos,
      filter,
      filteredTodos,
      activeTodosCount,
      hasCompletedTodos,
      allCompleted,
      addTodo,
      deleteTodo,
      updateTodo,
      toggleTodo,
      toggleAll,
      clearCompleted,
    ],
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

// ─── Custom hooks ─────────────────────────────────────────────────────────────

function useTodoContext(): TodoContextType {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }

  return context;
}

/** Read-only access to the full todo list and derived values */
export function useTodos() {
  const {
    todos,
    filteredTodos,
    activeTodosCount,
    hasCompletedTodos,
    allCompleted,
    newTodoInputRef,
  } = useTodoContext();

  return {
    todos,
    filteredTodos,
    activeTodosCount,
    hasCompletedTodos,
    allCompleted,
    newTodoInputRef,
  };
}

/** Current filter value and its setter */
export function useTodoFilter() {
  const { filter, setFilter } = useTodoContext();

  return { filter, setFilter };
}

/** All mutating actions for todos */
export function useTodoActions() {
  const {
    addTodo,
    deleteTodo,
    updateTodo,
    toggleTodo,
    toggleAll,
    clearCompleted,
  } = useTodoContext();

  return {
    addTodo,
    deleteTodo,
    updateTodo,
    toggleTodo,
    toggleAll,
    clearCompleted,
  };
}
