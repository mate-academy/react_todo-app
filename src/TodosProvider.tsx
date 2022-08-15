import React, { ReactNode, useMemo, useState } from 'react';
import { Todo } from './types/Todo';

type Props = {
  children: ReactNode,
};

type ContextValue = {
  userId: number,
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  isLoad: boolean,
  setIsLoad: React.Dispatch<React.SetStateAction<boolean>>,
  setUserId: React.Dispatch<React.SetStateAction<number>>,
};

export const TodosContext = React.createContext<ContextValue>({
  userId: 0,
  todos: [{
    id: 0,
    title: '',
    completed: false,
  }],
  isLoad: false,
  setIsLoad: () => {},
  setTodos: () => {},
  setUserId: () => {},
});

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoad, setIsLoad] = useState(false);
  const [userId, setUserId] = useState(0);

  const contextValue = useMemo(() => (
    {
      userId,
      setUserId,
      todos,
      setTodos,
      isLoad,
      setIsLoad,
    }
  ), [todos, isLoad]);

  return (
    <TodosContext.Provider value={contextValue}>
      {children}
    </TodosContext.Provider>
  );
};
