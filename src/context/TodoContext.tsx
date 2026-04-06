import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useRef,
  useMemo,
} from 'react';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export type FilterType = 'all' | 'active' | 'completed';

interface TodoContextType {
  todos: Todo[];
  filteredTodos: Todo[];
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  addTodo: (title: string) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (id: number, title: string) => void;
  toggleTodo: (id: number) => void;
  toggleAll: () => void;
  clearCompleted: () => void;
  allCompleted: boolean;
  hasCompleted: boolean;
  activeTodosCount: number;
  headerInputRef: React.RefObject<HTMLInputElement>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

const STORAGE_KEY = 'todos';

function loadTodos(): Todo[] {
  try {
    const storedTodos = localStorage.getItem(STORAGE_KEY);

    return storedTodos ? JSON.parse(storedTodos) : [];
  } catch {
    return [];
  }
}

interface Props {
  children: React.ReactNode;
}

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(loadTodos);
  const headerInputRef = useRef<HTMLInputElement>(null);
  const [filter, setFilter] = useState<FilterType>('all');

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

  const hasCompleted = useMemo(
    () => todos.some(todo => todo.completed),
    [todos],
  );

  const focusHeader = useCallback(() => {
    headerInputRef.current?.focus();
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    focusHeader();
  });
  const addTodo = useCallback(
    (title: string) => {
      const trimmed = title.trim();

      if (!trimmed) {
        return;
      }

      const newTodo: Todo = {
        id: Date.now(),
        title: trimmed,
        completed: false,
      };

      setTodos(prev => [...prev, newTodo]);
      focusHeader();
    },
    [focusHeader],
  );

  const deleteTodo = useCallback(
    (id: number) => {
      setTodos(prev => prev.filter(todo => todo.id !== id));
      focusHeader();
    },
    [focusHeader],
  );

  const updateTodo = useCallback(
    (id: number, title: string) => {
      const trimmed = title.trim();

      if (!trimmed) {
        deleteTodo(id);

        return;
      }

      setTodos(prev =>
        prev.map(todo => (todo.id === id ? { ...todo, title: trimmed } : todo)),
      );
      focusHeader();
    },
    [focusHeader, deleteTodo],
  );

  const toggleTodo = useCallback(
    (id: number) => {
      setTodos(prev =>
        prev.map(todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo,
        ),
      );
      focusHeader();
    },
    [focusHeader],
  );

  const allCompleted = todos.length > 0 && todos.every(todo => todo.completed);

  const toggleAll = useCallback(() => {
    const hasIncomplete = todos.some(todo => !todo.completed);

    setTodos(prev => prev.map(todo => ({ ...todo, completed: hasIncomplete })));
    focusHeader();
  }, [todos, focusHeader]);

  const clearCompleted = useCallback(() => {
    setTodos(prev => prev.filter(todo => !todo.completed));
    focusHeader();
  }, [focusHeader]);

  return (
    <TodoContext.Provider
      value={{
        todos,
        filteredTodos,
        filter,
        setFilter,
        addTodo,
        deleteTodo,
        updateTodo,
        toggleTodo,
        toggleAll,
        clearCompleted,
        allCompleted,
        hasCompleted,
        activeTodosCount,
        headerInputRef,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export function useTodos(): TodoContextType {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider');
  }

  return context;
}
