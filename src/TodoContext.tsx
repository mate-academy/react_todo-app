import React, { useState } from 'react';
import { useLocaleStorage } from './hooks/useLocaleStorage';

import { Todo } from './types/Todo';
import { Status } from './types/Status';

const LOCAL_STORAGE_KEY = 'todos';

export const TodoContext = React.createContext({
  todos: [] as Todo[],
  /* eslint-disable-next-line */
  setTodos: (_todos: Todo[]) => { },
  status: Status.All,
  /* eslint-disable-next-line */
  setStatus: (_status: Status) => {},
});

interface Props {
  children: React.ReactNode;
}

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocaleStorage<Todo[]>(LOCAL_STORAGE_KEY, []);
  const [status, setStatus] = useState<Status>(Status.All);

  const value = {
    todos,
    setTodos,
    status,
    setStatus,
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};
