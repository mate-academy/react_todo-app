import React, { useMemo, useState } from 'react';
import { Todo } from './types/Todo';
import { Status } from './types/Status';

const initialTodos: Todo[] = [];

type TodosContextType = {
  todos: Todo[],
  setTodos: (todos: Todo[]) => void,
  numberOfNotCompleted: number,
  setNumberOfNotCompleted: (numberOfNotCompleted: number) => void,
  filter: Status,
  setFilter: (filter: Status) => void,
};

export const TodosContext = React.createContext<TodosContextType>({
  todos: initialTodos,
  setTodos: () => {},
  numberOfNotCompleted: 0,
  setNumberOfNotCompleted: () => {},
  filter: Status.All,
  setFilter: () => {},
});

type Props = {
  children: React.ReactNode;
};

function useLocalStorage<T>(key: string, startValue: T):
[T, (v: T) => void] {
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

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage('todos', initialTodos);

  const [numberOfNotCompleted, setNumberOfNotCompleted] = useState(0);
  const [filter, setFilter] = useState<Status>(Status.All);

  const value = useMemo(() => ({
    todos,
    setTodos,
    numberOfNotCompleted,
    setNumberOfNotCompleted,
    filter,
    setFilter,
  }), [todos, setTodos, numberOfNotCompleted, filter]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
