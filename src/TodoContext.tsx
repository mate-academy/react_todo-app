import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Todo } from './types/Todo';
import { FILTER, FilterType } from './constants/filter';

type TodoContextType = {
  todos: Todo[];
  filter: FilterType;
  filteredTodos: Todo[];
  inputRef: React.RefObject<HTMLInputElement>;
  addTodo: (title: string) => void;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  updateTodo: (id: number, title: string) => void;
  clearCompleted: () => void;
  toggleAll: () => void;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

function getFilterFromHash(): FilterType {
  const hash = window.location.hash;

  if (hash === '#/active') {
    return FILTER.active;
  }

  if (hash === '#/completed') {
    return FILTER.completed;
  }

  return FILTER.all;
}

function loadTodos(): Todo[] {
  try {
    const saved = localStorage.getItem('todos');

    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>(loadTodos);
  const [filter, setFilter] = useState<FilterType>(getFilterFromHash);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const handleHashChange = () => setFilter(getFilterFromHash());

    window.addEventListener('hashchange', handleHashChange);

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const addTodo = useCallback((title: string) => {
    const trimmed = title.trim();

    if (!trimmed) {
      return;
    }

    setTodos(prev => [
      ...prev,
      { id: +new Date(), title: trimmed, completed: false },
    ]);
  }, []);

  const deleteTodo = useCallback(
    (id: number) => {
      setTodos(prev => prev.filter(todo => todo.id !== id));
      focusInput();
    },
    [focusInput],
  );

  const toggleTodo = useCallback((id: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }, []);

  const updateTodo = useCallback(
    (id: number, title: string) => {
      const trimmed = title.trim();

      if (!trimmed) {
        deleteTodo(id);

        return;
      }

      setTodos(prev =>
        prev.map(todo =>
          todo.id === id ? { ...todo, title: trimmed } : todo,
        ),
      );
    },
    [deleteTodo],
  );

  const clearCompleted = useCallback(() => {
    setTodos(prev => prev.filter(todo => !todo.completed));
    focusInput();
  }, [focusInput]);

  const toggleAll = useCallback(() => {
    const allCompleted = todos.every(todo => todo.completed);

    setTodos(prev => prev.map(todo => ({ ...todo, completed: !allCompleted })));
  }, [todos]);

  const filteredTodos = todos.filter(todo => {
    if (filter === FILTER.active) {
      return !todo.completed;
    }

    if (filter === FILTER.completed) {
      return todo.completed;
    }

    return true;
  });

  return (
    <TodoContext.Provider
      value={{
        todos,
        filter,
        filteredTodos,
        inputRef,
        addTodo,
        deleteTodo,
        toggleTodo,
        updateTodo,
        clearCompleted,
        toggleAll,
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
