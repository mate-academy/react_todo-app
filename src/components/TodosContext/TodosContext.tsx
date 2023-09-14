import React, { useState } from 'react';
import { Todo } from '../../types/Todo';

type TC = {
  todos: Todo[];
  setTodos: (t: Todo[]) => void;
};

const DEFAULT_TODOSCONTEXT: TC = {
  todos: [],
  setTodos: () => {},
};

export const TodosContext = React.createContext<TC>(DEFAULT_TODOSCONTEXT);

type Props = {
  children: React.ReactNode;
};

export const TodosContextProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <TodosContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodosContext.Provider>
  );
};
