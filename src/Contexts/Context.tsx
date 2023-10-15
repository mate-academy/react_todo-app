import React, { useCallback, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export type ContextType = {
  todos: Todo[];
  setTodos: (e: Todo[]) => void;
  visibleTodos: Todo[];
  setVisibleTodos: (e: Todo[]) => void;
  query: string;
  setQuery: (e: string) => void;
  queryCondition: QueryConditions;
  setQueryCondition: (e: QueryConditions) => void;
  isAllCompleted: boolean;
  checkIsAllCompleted: () => void;
};

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

interface Props {
  children: React.ReactNode;
}

export type QueryConditions = 'all' | 'active' | 'completed';

export const todoContext = React.createContext<ContextType | null>(null);

export const AppContext: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [visibleTodos, setVisibleTodos] = useLocalStorage<Todo[]>(
    'visible-todos',
    todos,
  );
  const [query, setQuery] = useLocalStorage('query', '');
  const [queryCondition, setQueryCondition] = useLocalStorage<QueryConditions>(
    'query-condition',
    'all',
  );
  const [isAllCompleted, setIsAllCompleted] = useLocalStorage(
    'is-all-completed',
    false,
  );

  const checkIsAllCompleted = useCallback(() => {
    setIsAllCompleted(todos.some((todo) => !todo.completed));
  }, [setIsAllCompleted, todos]);

  const states: ContextType = {
    todos,
    setTodos,
    query,
    setQuery,
    queryCondition,
    setQueryCondition,
    visibleTodos,
    setVisibleTodos,
    isAllCompleted,
    checkIsAllCompleted,
  };

  useEffect(() => {
    switch (queryCondition) {
      case 'completed':
        setVisibleTodos(todos.filter((todo) => todo.completed));
        break;
      case 'active':
        setVisibleTodos(todos.filter((todo) => !todo.completed));
        break;
      default:
        setVisibleTodos(todos);
    }
  }, [queryCondition, setVisibleTodos, todos]);

  return (
    <todoContext.Provider value={{ ...states }}>
      {children}
    </todoContext.Provider>
  );
};
