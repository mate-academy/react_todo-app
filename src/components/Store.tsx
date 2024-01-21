import React, { useEffect, useMemo, useState } from 'react';
import { Todo } from '../types/todo';
import { IsCompletedAll } from '../types/isCompletedAll';

function useLocalStorage<T>(key: string, startValue: T): [T, (v: T) => void] {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);

    if (!data) {
      localStorage.setItem(key, JSON.stringify(startValue));

      return startValue;
    }

    try {
      return JSON.parse(data);
    } catch (e) {
      return startValue;
    }
  });

  const save = (newValue: T) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, save];
}

type TodosContextType = {
  todos: Todo[];
  setTodos: React.Dispatch<Todo[]>;
  isCompletedAll: IsCompletedAll;
  setIsCompletedAll: React.Dispatch<React.SetStateAction<IsCompletedAll>>;
  filteredTodos: Todo[];
  setFilteredTodos: React.Dispatch<Todo[]>;
};

type Props = {
  children: React.ReactNode;
};

export const TodosContext = React.createContext<TodosContextType>({
  todos: [],
  setTodos: () => {},
  isCompletedAll: null,
  setIsCompletedAll: () => {},
  filteredTodos: [],
  setFilteredTodos: () => {},
});

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [isCompletedAll, setIsCompletedAll] = useState<IsCompletedAll>(null);
  const [filteredTodos, setFilteredTodos] = useState(todos);

  useEffect(() => {
    if (todos.length === 0) {
      setIsCompletedAll(null);
    }
  }, [todos]);

  const value = useMemo(() => ({
    todos,
    setTodos,
    isCompletedAll,
    setIsCompletedAll,
    filteredTodos,
    setFilteredTodos,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [todos, isCompletedAll, filteredTodos]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
