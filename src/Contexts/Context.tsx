import React, { useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export type DefaultValueType = {
  todos: Todo[];
  setTodos: (e: Todo[]) => void;
  visibleTodos: Todo[];
  setVisibleTodos: (e: Todo[]) => void;
  query: string;
  setQuery: (e: string) => void;
  queryCondition: QueryConditions;
  setQueryCondition: (e: QueryConditions) => void;
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

export const todoContext = React.createContext<DefaultValueType | null>(null);

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

  const states: DefaultValueType = {
    todos,
    setTodos,
    query,
    setQuery,
    queryCondition,
    setQueryCondition,
    visibleTodos,
    setVisibleTodos,
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

  // useEffect(() => {
  //   console.log(todos);
  // }, [todos]);

  return (
    <todoContext.Provider value={{ ...states }}>
      {children}
    </todoContext.Provider>
  );
};
