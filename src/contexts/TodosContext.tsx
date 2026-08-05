import React, { createContext, useState } from 'react';
import { Todo } from '../types/Todo';

type TodosSetter =
  | ((value: Todo[] | ((prevState: Todo[]) => Todo[])) => void)
  | null;

export const TodosSetterContext = createContext<TodosSetter>(null);
export const TodosStateContext = createContext<Todo[] | null>(null);

interface Props {
  children: React.ReactNode;
}

export const TodosProvider = ({ children }: Props) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <TodosSetterContext.Provider value={setTodos}>
      <TodosStateContext.Provider value={todos}>
        {children}
      </TodosStateContext.Provider>
    </TodosSetterContext.Provider>
  );
};
