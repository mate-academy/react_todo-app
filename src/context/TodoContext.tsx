import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { FilterStatus, Todo } from '../types/Todo';
import { ERROR_MESSAGES, getErrorMessage } from '../utils/errorHandler';

interface TodoContextType {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  filter: FilterStatus;
  processingIds: number[];
  errorMessage: string | null;
  activeCount: number;

  setFilter: (status: FilterStatus) => void;
  addTodo: (title: string) => Promise<void>;
  removeTodo: (todoId: number) => Promise<void>;
  updateTodo: (
    todoId: number,
    data: Partial<Omit<Todo, 'id'>>,
  ) => Promise<void>;
  toggleAll: () => Promise<void>;
  clearCompleted: () => Promise<void>;
  handleError: (key: keyof typeof ERROR_MESSAGES) => void;
}

export const TodoContext = React.createContext<TodoContextType | null>(null);

export const useTodos = () => {
  const context = useContext(TodoContext);

  if (context === null) {
    throw new Error(ERROR_MESSAGES.CONTEXT_MISSING);
  }

  return context;
};

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [processingIds, setProcessingIds] = useState<number[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const clearError = useCallback(() => setErrorMessage(null), []);

  const handleError = useCallback((key: keyof typeof ERROR_MESSAGES) => {
    const message = getErrorMessage(key);

    setErrorMessage(message);
    setTimeout(() => setErrorMessage(null), 3000);
  }, []);

  useEffect(() => {
    try {
      const storedTodos = localStorage.getItem('todos');

      if (storedTodos) {
        setTodos(JSON.parse(storedTodos) as Todo[]);
      }
    } catch (e) {
      handleError('LOCAL_STORAGE');
    }
  }, [handleError]);

  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (e) {
      handleError('LOCAL_STORAGE');
    }
  }, [todos, handleError]);

  const activeCount = useMemo(
    () => todos.filter((t) => !t.completed).length,
    [todos],
  );

  const addTodo = useCallback(
    async (title: string) => {
      const newTodo: Todo = {
        id: +new Date(),
        title: title.trim(),
        completed: false,
      };

      try {
        setProcessingIds((current) => [...current, newTodo.id]);
        await new Promise((resolve) => setTimeout(resolve, 50));
        setTodos((current) => [...current, newTodo]);
      } catch (e) {
        handleError('ADD_TODO');
      } finally {
        setProcessingIds((current) =>
          current.filter((id) => id !== newTodo.id),
        );
      }
    },
    [handleError],
  );

  const removeTodo = useCallback(
    async (todoId: number) => {
      setProcessingIds((current) => [...current, todoId]);

      try {
        setTodos((current) => current.filter((todo) => todo.id !== todoId));
      } catch (e) {
        handleError('DELETE_TODO');
      } finally {
        setProcessingIds((current) => current.filter((id) => id !== todoId));
      }
    },
    [handleError],
  );

  const updateTodo = useCallback(
    async (todoId: number, data: Partial<Omit<Todo, 'id'>>) => {
      setProcessingIds((current) => [...current, todoId]);

      try {
        setTodos((current) => {
          const updated = current.map((todo) =>
            todo.id === todoId ? { ...todo, ...data } : todo,
          );

          localStorage.setItem('todos', JSON.stringify(updated));

          return updated;
        });
      } catch (e) {
        handleError('UPDATE_TODO');
      } finally {
        setProcessingIds((current) => current.filter((id) => id !== todoId));
      }
    },
    [handleError],
  );

  const toggleAll = useCallback(async () => {
    try {
      const areAllCompleted = todos.every((todo) => todo.completed);
      const targetCompleted = !areAllCompleted;

      setTodos((current) =>
        current.map((todo) => ({ ...todo, completed: targetCompleted })),
      );
      await new Promise((resolve) => setTimeout(resolve, 50));
    } catch (e) {
      handleError('TOGGLE_ALL_FAIL');
    }
  }, [todos, handleError]);

  const clearCompleted = useCallback(async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setTodos((current) => current.filter((todo) => !todo.completed));
    } catch (e) {
      handleError('CLEAR_COMPLETED_FAIL');
    }
  }, [handleError]);

  const contextValue = useMemo(
    () => ({
      todos,
      setTodos,
      filter,
      processingIds,
      errorMessage,
      activeCount,

      setFilter,
      addTodo,
      removeTodo,
      updateTodo,
      toggleAll,
      clearCompleted,
      handleError,
      clearError,
    }),
    [
      todos,
      setTodos,
      filter,
      processingIds,
      errorMessage,
      activeCount,
      setFilter,
      addTodo,
      removeTodo,
      updateTodo,
      toggleAll,
      clearCompleted,
      handleError,
      clearError,
    ],
  );

  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
};
