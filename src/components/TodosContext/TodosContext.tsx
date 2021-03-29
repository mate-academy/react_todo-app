import React, { Dispatch, SetStateAction, useMemo } from 'react';
import { useLocalStorage } from '@penseapp/uselocalstorage';

export type Todo = {
  id: number,
  title: string,
  completed: boolean,
};

type ContextProps = {
  todos: Todo[],
  setTodos: Dispatch<SetStateAction<Todo[]>>,
};

const contextProps = {
  todos: [],
  setTodos: () => {},
};

type Children = {
  children: Children,
}

export const TodosContext = React.createContext<ContextProps>(contextProps);

export const TodosProvider = ({ children }: Children) => {
  const [todos, setTodos] = useLocalStorage('todos', []);

  const contextValue = useMemo(() => ({
    todos,
    setTodos,
  }), [todos, setTodos]);

  return (
    <TodosContext.Provider value={contextValue}>
      {children}
    </TodosContext.Provider>
  );
};
