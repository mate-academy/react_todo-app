import React, { useEffect, useState } from 'react';
import { Todo } from '../types/Todo';

function getState() {
  const data = localStorage.getItem('todos');

  if (!data) {
    return [];
  }

  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export const TodosContext = React.createContext(getState());

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [lsTodos, setLsTodos] = useState<Todo[]>(getState());

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(lsTodos));
  }, [lsTodos]);

  return (
    <TodosContext.Provider value={{ lsTodos, setLsTodos }}>
      {children}
    </TodosContext.Provider>
  );
};
