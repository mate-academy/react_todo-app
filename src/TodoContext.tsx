import React, { useState } from 'react';

import { FilterContext } from './FilterContext';
import { useLocaleStorage } from './hooks/useLocaleStorage';

import { Todo } from './types/Todo';
import { Status } from './types/Status';

const LOCAL_STORAGE_KEY = 'todos';

export const TodoContext = React.createContext({
  todos: [] as Todo[],
  /* eslint-disable-next-line */
  setTodos: (_todos: Todo[]) => { },
});

interface Props {
  children: React.ReactNode;
}

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocaleStorage<Todo[]>(LOCAL_STORAGE_KEY, []);
  const [status, setStatus] = useState<Status>(Status.All);

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      <FilterContext.Provider value={{ status, setStatus }}>
        {children}
      </FilterContext.Provider>
    </TodoContext.Provider>
  );
};
