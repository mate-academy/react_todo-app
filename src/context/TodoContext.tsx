import React, { useMemo, useState } from 'react';
import { Todo } from '../types/Todo';
import { KEY_TODOS } from '../utils/constants';

interface TodosContextType {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const TodosContext = React.createContext<TodosContextType>({
  todos: [] as Todo[],
  setTodos: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const todosJs = localStorage.getItem(KEY_TODOS);

    return todosJs ? JSON.parse(todosJs) : [];
  });

  const value = useMemo(
    () => ({
      todos,
      setTodos,
    }),
    [todos],
  );

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};
