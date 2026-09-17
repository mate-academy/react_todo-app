import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type FC,
  type PropsWithChildren,
} from 'react';

import type { Todo } from '../types/Todo';

const TODOS_STORAGE_KEY = 'todos';

interface TodosContextValue {
  todos: Todo[];
  addTodo: (title: string) => void;
  deleteTodo: (todoId: number) => void;
  updateTodo: (todoId: number, title: string) => void;
  toggleTodo: (todoId: number) => void;
  toggleAll: () => void;
  clearCompleted: () => void;
}

const TodosContext = createContext<TodosContextValue | undefined>(undefined);

const getInitialTodos = (): Todo[] => {
  const savedTodos = localStorage.getItem(TODOS_STORAGE_KEY);

  if (!savedTodos) {
    return [];
  }

  try {
    const parsedTodos: unknown = JSON.parse(savedTodos);

    return Array.isArray(parsedTodos) ? (parsedTodos as Todo[]) : [];
  } catch {
    return [];
  }
};

export const TodosProvider: FC<PropsWithChildren> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(getInitialTodos);

  const updateTodos = useCallback((updatedTodos: Todo[]) => {
    setTodos(updatedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = useCallback(
    (title: string) => {
      const trimmedTitle = title.trim();

      if (!trimmedTitle) {
        return;
      }

      const newTodo: Todo = {
        id: Date.now(),
        title: trimmedTitle,
        completed: false,
      };

      updateTodos([...todos, newTodo]);
    },
    [todos, updateTodos],
  );

  const deleteTodo = useCallback(
    (todoId: number) => {
      updateTodos(todos.filter(todo => todo.id !== todoId));
    },
    [todos, updateTodos],
  );

  const updateTodo = useCallback(
    (todoId: number, title: string) => {
      updateTodos(
        todos.map(todo => (todo.id === todoId ? { ...todo, title } : todo)),
      );
    },
    [todos, updateTodos],
  );

  const toggleTodo = useCallback(
    (todoId: number) => {
      updateTodos(
        todos.map(todo =>
          todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
        ),
      );
    },
    [todos, updateTodos],
  );

  const toggleAll = useCallback(() => {
    const shouldCompleteTodos = todos.some(todo => !todo.completed);

    updateTodos(
      todos.map(todo => ({ ...todo, completed: shouldCompleteTodos })),
    );
  }, [todos, updateTodos]);

  const clearCompleted = useCallback(() => {
    updateTodos(todos.filter(todo => !todo.completed));
  }, [todos, updateTodos]);

  const value = useMemo(
    () => ({
      todos,
      addTodo,
      deleteTodo,
      updateTodo,
      toggleTodo,
      toggleAll,
      clearCompleted,
    }),
    [
      todos,
      addTodo,
      deleteTodo,
      updateTodo,
      toggleTodo,
      toggleAll,
      clearCompleted,
    ],
  );

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};

export const useTodos = (): TodosContextValue => {
  const todosContext = useContext(TodosContext);

  if (!todosContext) {
    throw new Error('useTodos must be used inside TodosProvider');
  }

  return todosContext;
};
