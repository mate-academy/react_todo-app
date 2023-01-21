import React, { useMemo, useState } from 'react';
import { Todo } from '../types/Todo';

interface DefaultContextType {
  todosFromServer: Todo[],
  setTodosFromServer: (todo: Todo[]) => void,

  todoIdsForLoader: number[],
  setTodoIdsForLoader: (id: number[]) => void,
}

export const DefaultContext = React.createContext<DefaultContextType>({
  todosFromServer: [],
  setTodosFromServer: () => {},

  todoIdsForLoader: [],
  setTodoIdsForLoader: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const DefaultProvider = ({ children }: Props) => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [todoIdsForLoader, setTodoIdsForLoader] = useState<number[]>([]);

  const contextValues = useMemo(() => (
    {
      todosFromServer,
      setTodosFromServer,
      todoIdsForLoader,
      setTodoIdsForLoader,
    }
  ), [todoIdsForLoader, todosFromServer]);

  return (
    <DefaultContext.Provider value={contextValues}>
      {children}
    </DefaultContext.Provider>
  );
};
