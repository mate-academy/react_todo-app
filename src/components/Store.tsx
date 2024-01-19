import React, { useEffect, useMemo, useState } from 'react';
import { Todo } from '../types/todo';
import { CompletedAll } from '../types/completedAll';

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

  const save = (newValue: T) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, save];
}

type TodosContextType = {
  todos: Todo[];
  setTodos: React.Dispatch<Todo[]>;
  completedAll: CompletedAll;
  setCompletedAll: React.Dispatch<React.SetStateAction<CompletedAll>>;
  filteredTodos: Todo[];
  setFilteredTodos: React.Dispatch<Todo[]>;
};

type Props = {
  children: React.ReactNode;
};

export const TodosContext = React.createContext<TodosContextType>({
  todos: [],
  setTodos: () => {},
  completedAll: null,
  setCompletedAll: () => {},
  filteredTodos: [],
  setFilteredTodos: () => {},
});

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [completedAll, setCompletedAll] = useState<CompletedAll>(null);
  const [filteredTodos, setFilteredTodos] = useState(todos);

  useEffect(() => {
    if (todos.length === 0) {
      setCompletedAll(null);
    }
  }, [todos]);

  const value = useMemo(() => ({
    todos,
    setTodos,
    completedAll,
    setCompletedAll,
    filteredTodos,
    setFilteredTodos,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [todos, completedAll, filteredTodos]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
