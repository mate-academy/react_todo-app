import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Todo } from '../types/Todo';
import { Filter } from '../types/Filter';
import {
  addTodo,
  deleteTodo,
  getTodos,
  updateTodo,
  USER_ID,
} from '../api/todos';
import { UserWarning } from '../UserWarning';

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
  handleSubmit: (event: React.FormEvent) => void;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  toggleAll: () => Promise<void>;
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
      const data = await getTodos();

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
      setTodos(current => current.filter(todo => todo.id !== todoId));
      await deleteTodo(todoId);
      inputRef.current?.focus();
    } catch (err) {
      setError('Unable to delete a todo');
      setTodos(prev => {
        const deletedTodo = deletingTodoIds.includes(todoId)
          ? { id: todoId, title: '', completed: false, userId: USER_ID }
          : null;

        return deletedTodo ? [...prev, deletedTodo] : prev;
      });
      setTimeout(() => setError(''), 3000);
      throw err;
    } finally {
      setDeletingTodoIds(ids => ids.filter(id => id !== todoId));
    }
  };

  const handleRename = async (todoId: number, newTitle: string) => {
    try {
      setLoadingTodoIds(ids => [...ids, todoId]);

      const updatedTodo = await updateTodo(todoId, { title: newTitle });

      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo.id === todoId ? { ...todo, title: updatedTodo.title } : todo,
        ),
      );
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

    setTodos(current =>
      current.map(todo =>
        todo.id === todoId ? { ...todo, completed: newStatus } : todo,
      ),
    );

    try {
      const updatedTodo = await updateTodo(todoId, { completed: newStatus });

      if (updatedTodo && typeof updatedTodo.completed !== 'undefined') {
        setTodos(current =>
          current.map(todo =>
            todo.id === todoId
              ? { ...todo, completed: updatedTodo.completed }
              : todo,
          ),
        );
      }
    } catch {
      setError('Unable to update a todo');
      setTodos(current =>
        current.map(todo =>
          todo.id === todoId ? { ...todo, completed: !newStatus } : todo,
        ),
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
      userId: USER_ID,
      title: trimmedTitle,
      completed: false,
      id: 0,
    };

    setTodos(prev => [...prev, newTodo]);
    setIsCreating(true);
    setTempTodo({ ...newTodo, id: 0 });
    setTitle('');

    try {
      const createdTodo = await addTodo(newTodo);

      setTodos(prev => prev.map(todo => (todo.id === 0 ? createdTodo : todo)));
    } catch {
      setError('Unable to add a todo');
      setTimeout(() => setError(''), 3000);
      setTodos(prev => prev.filter(todo => todo.id !== 0));
    } finally {
      setIsCreating(false);
      setTempTodo(null);
    }
  };

  const toggleAll = async () => {
    const areAllCompleted = todos.every(todo => todo.completed);
    const newStatus = !areAllCompleted;

    const todosToUpdate = todos.filter(todo => todo.completed !== newStatus);

    setTodos(current =>
      current.map(todo =>
        todosToUpdate.some(t => t.id === todo.id)
          ? { ...todo, completed: newStatus }
          : todo,
      ),
    );

    setLoadingTodoIds(ids => [...ids, ...todosToUpdate.map(todo => todo.id)]);
    try {
      await Promise.all(
        todosToUpdate.map(todo =>
          updateTodo(todo.id, { completed: newStatus }),
        ),
      );
    } catch {
      setError('Unable to update some todos');

      setTodos(current =>
        current.map(todo =>
          todosToUpdate.some(t => t.id === todo.id)
            ? { ...todo, completed: !newStatus }
            : todo,
        ),
      );

      setTimeout(() => setError(''), 3000);
    } finally {
      setLoadingTodoIds(ids =>
        ids.filter(id => !todosToUpdate.some(todo => todo.id === id)),
      );
    }
  };

  const onClearCompleted = async () => {
    const completed = todos.filter(t => t.completed);
    const completedIds = completed.map(t => t.id);

    setTodos(curr => curr.filter(t => !completedIds.includes(t.id)));

    setDeletingTodoIds(curr => [...curr, ...completedIds]);

    try {
      await Promise.all(completed.map(t => deleteTodo(t.id)));
    } catch {
      setError('Unable to delete some todos');
      setTimeout(() => setError(''), 3000);
    } finally {
      setDeletingTodoIds(curr => curr.filter(id => !completedIds.includes(id)));
    }

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

  if (!USER_ID) {
    return <UserWarning />;
  }

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
