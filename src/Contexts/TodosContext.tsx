import React, { useMemo, useState } from 'react';
import { Todo } from '../Types/Todo';
import { Status } from '../Types/Status';

function useLocalStorage<T>(key: string, startValue: T): [T, (v: T) => void] {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      return startValue;
    }

    try {
      return JSON.parse(data);
    } catch (e) {
      return startValue;
    }
  });

  const save = (newWalue: T) => {
    localStorage.setItem(key, JSON.stringify(newWalue));
    setValue(newWalue);
  };

  return [value, save];
}

interface TodosContextType {
  todos: Todo[],
  setTodos: (todo: Todo[]) => void,
  query: Status,
  setQuery: React.Dispatch<React.SetStateAction<Status>>,
}

interface Props {
  children: React.ReactNode;
}

export const TodosContext = React.createContext<TodosContextType>({
  todos: [],
  setTodos: () => {},
  query: Status.All,
  setQuery: () => {},
});

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [query, setQuery] = useState(Status.All);

  const value: TodosContextType = useMemo(() => ({
    todos,
    setTodos,
    query,
    setQuery,
  }), [todos, query, setTodos]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
