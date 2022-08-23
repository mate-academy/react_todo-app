import React, { ReactNode, useMemo, useState } from 'react';
import { Todo } from './types/Todo';

type Props = {
  children: ReactNode,
};

type ContextValue = {
  userId: number,
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setUserId: React.Dispatch<React.SetStateAction<number>>,
};

function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(key) || '') || initialValue;
    } catch {
      return initialValue;
    }
  });

  const save = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, save];
}

export const TodosContext = React.createContext<ContextValue>({
  userId: 0,
  todos: [{
    id: 0,
    title: '',
    completed: false,
  }],
  setTodos: () => {},
  setUserId: () => {},
});

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [userId, setUserId] = useLocalStorage<number>('userId', 0);

  const contextValue = useMemo(() => (
    {
      userId,
      setUserId,
      todos,
      setTodos,
    }
  ), [todos, userId]);

  return (
    <TodosContext.Provider value={contextValue}>
      {children}
    </TodosContext.Provider>
  );
};
