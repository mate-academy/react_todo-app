import React, { ReactNode, useMemo, useState } from 'react';
import { Todo } from '../types/Todo';

type ContextValue = {
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

type Props = {
  children: ReactNode,
};

const todosFromServer = [{
  id: 1,
  title: 'aboba',
  completed: false,
}];

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
  todos: todosFromServer,
  setTodos: () => {},
});

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);

  const contextValue = useMemo(() => (
    {
      todos,
      setTodos,
    }
  ), [todos]);

  return (
    <TodosContext.Provider value={contextValue}>
      {children}
    </TodosContext.Provider>
  );
};
