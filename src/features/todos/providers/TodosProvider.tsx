import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Todo } from '../types/Todo';
import { QueryTodos } from '../constants/queryTodos';
import { filterTodos } from '../utils/filterTodos';

function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(() => {
    const savedValue = localStorage.getItem(key);

    if (savedValue === null) {
      return defaultValue;
    }

    try {
      return JSON.parse(savedValue);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(`Error parsing localStorage key "${key}":`, error);

      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Error saving to localStorage key "${key}":`, error);
    }
  }, [key, value]);

  return [value, setValue] as const;
}

type TodosContextType = {
  completedAllTodos: boolean;
  todos: Todo[];
  preparedTodos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  query: QueryTodos;
  setQuery: React.Dispatch<React.SetStateAction<QueryTodos>>;
  uncompletedTodosLength: number;
  headerInputRef: React.RefObject<HTMLInputElement>;
  focusHeaderInput: () => void;
  selectedTodo: Todo | null;
  setSelectedTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
};

const TodosContext = React.createContext<TodosContextType | undefined>(
  undefined,
);

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [query, setQuery] = useState<QueryTodos>(QueryTodos.All);
  const headerInputRef = useRef<HTMLInputElement>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const focusHeaderInput = () => {
    headerInputRef.current?.focus();
  };

  const preparedTodos = useMemo(() => {
    return filterTodos(todos, query);
  }, [todos, query]);

  const completedAllTodos = useMemo(
    () => todos.length > 0 && todos.every(todo => todo.completed),
    [todos],
  );

  const uncompletedTodosLength = useMemo(
    () => todos.filter(todo => !todo.completed).length,
    [todos],
  );

  const value = useMemo(
    () => ({
      preparedTodos,
      completedAllTodos,
      todos,
      setTodos,
      uncompletedTodosLength,
      setQuery,
      query,
      headerInputRef,
      focusHeaderInput,
      selectedTodo,
      setSelectedTodo,
    }),
    [
      preparedTodos,
      completedAllTodos,
      todos,
      setTodos,
      uncompletedTodosLength,
      query,
      selectedTodo,
    ],
  );

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodosContext);

  if (context === undefined) {
    throw new Error('useTodos must be used within a TodosProvider');
  }

  return context;
};
