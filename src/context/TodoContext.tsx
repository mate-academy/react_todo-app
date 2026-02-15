import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

type FilterType = 'all' | 'active' | 'completed';

interface TodoContextType {
  todos: Todo[];
  visibleTodos: Todo[];
  filter: FilterType;
  setFilter: (f: FilterType) => void;
  addTodo: (title: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void; // Poprawione
  updateTodo: (id: number, title: string) => void;
  clearCompleted: () => void;
  toggleAll: () => void;
  activeCount: number;
  hasCompleted: boolean;
  focusNewTodo: () => void; // Nowa metoda w kontekście
  setFocusHandler: (handler: () => void) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');

    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState<FilterType>('all');
  const [focusHandler, setFocusHandler] = useState<() => void>(() => () => {});

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const activeCount = useMemo(
    () => todos.filter(t => !t.completed).length,
    [todos],
  );
  const hasCompleted = useMemo(() => todos.some(t => t.completed), [todos]);
  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      if (filter === 'active') {
        return !todo.completed;
      }

      if (filter === 'completed') {
        return todo.completed;
      }

      return true;
    });
  }, [todos, filter]);

  const focusNewTodo = () => focusHandler();

  const addTodo = (title: string) => {
    const trimmedTitle = title.trim();

    if (trimmedTitle) {
      setTodos(prev => [
        ...prev,
        { id: +new Date(), title: trimmedTitle, completed: false },
      ]);
    }
  };

  const deleteTodo = (id: number) => {
    setTodos(prev => prev.filter(t => t.id !== id));
    setTimeout(focusNewTodo, 0); // Focus po usunięciu (async, żeby DOM się przeliczył)
  };

  const toggleTodo = (id: number) => {
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const updateTodo = (id: number, title: string) => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      deleteTodo(id);
    } else {
      setTodos(prev =>
        prev.map(t => (t.id === id ? { ...t, title: trimmedTitle } : t)),
      );
    }
  };

  const clearCompleted = () => {
    setTodos(prev => prev.filter(t => !t.completed));
    setTimeout(focusNewTodo, 0);
  };

  const toggleAll = () => {
    const allDone = todos.every(t => t.completed);

    setTodos(prev => prev.map(t => ({ ...t, completed: !allDone })));
  };

  return (
    <TodoContext.Provider
      value={{
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
        focusNewTodo,
        setFocusHandler,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('useTodos must be used within TodoProvider');
  }

  return context;
};
