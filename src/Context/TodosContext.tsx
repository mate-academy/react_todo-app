import React, { useCallback, useMemo, useState } from 'react';
import { Todo } from '../Types/Todo';
import { Status } from '../Types/Status';

function useLocalStorage<T>(key: string, startValue: T): [T, (v: T) => void] {
  const [value, setValue] = useState(() => {
    try {
      const data = localStorage.getItem(key);

      return data ? JSON.parse(data) : startValue;
    } catch (error) {
      return startValue;
    }
  });

  const save = useCallback(
    (newValue: T) => {
      localStorage.setItem(key, JSON.stringify(newValue));
      setValue(newValue);
    },
    [key],
  );

  return [value, save];
}

interface TodosContextType {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  statusQuery: Status;
  setStatusQuery: (newQuery: Status) => void;
}

interface Props {
  children: React.ReactNode;
}

const defaultTodosContextValue: TodosContextType = {
  todos: [],
  setTodos: () => {},
  statusQuery: Status.All,
  setStatusQuery: () => {},
};

export const TodosContext = React.createContext<TodosContextType>(
  defaultTodosContextValue,
);

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [statusQuery, setStatusQuery] = useState<Status>(Status.All);

  const memoizedSetTodos = setTodos;
  const memoizedSetStatusQuery = setStatusQuery;

  const value = useMemo(
    () => ({
      todos,
      setTodos: memoizedSetTodos,
      statusQuery,
      setStatusQuery: memoizedSetStatusQuery,
    }),
    [todos, memoizedSetTodos, statusQuery, memoizedSetStatusQuery],
  );

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
