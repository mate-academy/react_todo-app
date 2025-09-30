import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Todo } from '../types/Todo';
import { Filter } from '../types/Filter';

const LS_KEY = 'todos';

type TodosContextType = {
  filter: {
    statusFilter: Filter;
    setStatusFilter: React.Dispatch<React.SetStateAction<Filter>>;
  };
  value: {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  };
  loadTodos: () => Promise<void>;
  loadingTodoIds: number[];
  setLoadingTodoIds: React.Dispatch<React.SetStateAction<number[]>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  deletingTodoIds: number[];
  setDeletingTodoIds: React.Dispatch<React.SetStateAction<number[]>>;
  handleDelete: (todoId: number) => Promise<void>;
  handleRename: (todoId: number, newTitle: string) => void;
  onToggleStatus: (todoId: number, newStatus: boolean) => void;
  tempTodo: Todo | null;
  setTempTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
  isCreating: boolean;
  setIsCreating: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: (event: React.FormEvent) => void;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  toggleAll: () => void;
  onClearCompleted: () => void;
  completedCount: number;
  filteredTodos: Todo[];
  inputRef: React.RefObject<HTMLInputElement>;
};

export const TodosContext = React.createContext<TodosContextType | undefined>(
  undefined,
);

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem(LS_KEY);

    return saved ? JSON.parse(saved) : [];
  });
  const [statusFilter, setStatusFilter] = useState<Filter>(Filter.All);
  const [loadingTodoIds, setLoadingTodoIds] = useState<number[]>([]);
  const [error, setError] = useState('');
  const [deletingTodoIds, setDeletingTodoIds] = useState<number[]>([]);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(todos));
  }, [todos]);

  const value = useMemo(() => ({ todos, setTodos }), [todos]);
  const filter = useMemo(
    () => ({ statusFilter, setStatusFilter }),
    [statusFilter],
  );

  const completedCount = todos.filter(todo => todo.completed).length;

  const loadTodos = useCallback(async () => {
    setLoadingTodoIds(ids => [...ids, 0]);
    setError('');

    try {
      const data = JSON.parse(localStorage.getItem('todos') || '[]');

      setTodos(data);
    } catch (err) {
      setError('Unable to load todos');

      setTimeout(() => {
        setError('');
      }, 3000);
    } finally {
      setLoadingTodoIds(ids => ids.filter(id => id !== 0));
    }
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('todos');

    if (saved) {
      setTodos(JSON.parse(saved));
    } else {
      loadTodos();
    }
  }, [loadTodos]);

  const handleDelete = async (todoId: number) => {
    setDeletingTodoIds(ids => [...ids, todoId]);

    try {
      setTodos(current => {
        const updated = current.filter(todo => todo.id !== todoId);

        localStorage.setItem('todos', JSON.stringify(updated));

        return updated;
      });
      inputRef.current?.focus();
    } catch (err) {
      setError('Unable to delete a todo');
      setTodos(prev => prev);
      setTimeout(() => setError(''), 3000);
      throw err;
    } finally {
      setDeletingTodoIds(ids => ids.filter(id => id !== todoId));
    }
  };

  const handleRename = async (todoId: number, newTitle: string) => {
    try {
      setLoadingTodoIds(ids => [...ids, todoId]);

      setTodos(prevTodos => {
        const updatedTodos = prevTodos.map(todo => {
          if (todo.id === todoId) {
            const updatedTodo = { ...todo, title: newTitle };

            return updatedTodo;
          } else {
            return todo;
          }
        });

        localStorage.setItem('todos', JSON.stringify(updatedTodos));

        return updatedTodos;
      });
    } catch (err) {
      setError('Unable to update a todo');
      setTimeout(() => setError(''), 3000);
      throw err;
    } finally {
      setLoadingTodoIds(ids => ids.filter(id => id !== todoId));
    }
  };

  const onToggleStatus = async (todoId: number, newStatus: boolean) => {
    setLoadingTodoIds(ids => [...ids, todoId]);

    try {
      setTodos(current => {
        const updatedTodos = current.map(todo => {
          if (todo.id === todoId) {
            return { ...todo, completed: newStatus };
          } else {
            return todo;
          }
        });

        localStorage.setItem('todos', JSON.stringify(updatedTodos));

        return updatedTodos;
      });
    } catch {
      setError('Unable to update a todo');
      setTodos(current =>
        current.map(todo => {
          if (todo.id === todoId) {
            return { ...todo, completed: !newStatus };
          } else {
            return todo;
          }
        }),
      );
      setTimeout(() => setError(''), 3000);
    } finally {
      setLoadingTodoIds(ids => ids.filter(id => id !== todoId));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError('Title should not be empty');
      setTimeout(() => setError(''), 3000);

      return;
    }

    const newTodo = {
      userId: 1,
      title: trimmedTitle,
      completed: false,
      id: Date.now(),
    };

    setTodos(prev => {
      const updatedTodos = [...prev, newTodo];

      localStorage.setItem('todos', JSON.stringify(updatedTodos));

      return updatedTodos;
    });
    setTitle('');
  };

  const toggleAll = () => {
    const areAllCompleted = todos.every(todo => todo.completed);
    const newStatus = !areAllCompleted;

    setTodos(current => {
      const updatedTodos = current.map(todo => ({
        ...todo,
        completed: newStatus,
      }));

      localStorage.setItem('todos', JSON.stringify(updatedTodos));

      return updatedTodos;
    });
  };

  const onClearCompleted = () => {
    setTodos(curr => {
      const remainingTodos = curr.filter(t => !t.completed);

      localStorage.setItem('todos', JSON.stringify(remainingTodos));

      return remainingTodos;
    });

    inputRef.current?.focus();
  };

  const filteredTodos = todos.filter(todo => {
    if (statusFilter === Filter.Active) {
      return !todo.completed;
    }

    if (statusFilter === Filter.Completed) {
      return todo.completed;
    }

    return true;
  });

  return (
    <TodosContext.Provider
      value={{
        value,
        filter,
        error,
        loadingTodoIds,
        setLoadingTodoIds,
        loadTodos,
        setError,
        deletingTodoIds,
        setDeletingTodoIds,
        handleDelete,
        handleRename,
        onToggleStatus,
        tempTodo,
        setTempTodo,
        isCreating,
        setIsCreating,
        handleSubmit,
        title,
        setTitle,
        toggleAll,
        onClearCompleted,
        completedCount,
        filteredTodos,
        inputRef,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = (): TodosContextType => {
  const context = useContext(TodosContext);

  if (!context) {
    throw new Error('useTodos must be used within a TodosProvider');
  }

  return context;
};
