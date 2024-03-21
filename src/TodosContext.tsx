import React, { useMemo, useState } from 'react';
import { Todo } from './types/Todo';
import useLocalStorage from './hooks/useLocalStorage';

type Props = {
  children: React.ReactNode;
};

type ContextType = {
  todos: Todo[];
  visibleTodos: Todo[];
  setVisibleTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setTodos: (prevTodos: Todo[]) => void;
  addTodo: (todo: Todo) => void;
};

export const TodosContext = React.createContext<ContextType>({
  todos: [],
  visibleTodos: [],
  setVisibleTodos: () => [],
  setTodos: () => [],
  addTodo: () => {},
});

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);

  const addTodo = (todo: Todo) => {
    setTodos([todo, ...todos]);
    setVisibleTodos(() => {
      return [todo, ...todos];
    });
  };

  const value = useMemo(
    () => ({
      todos,
      visibleTodos,
      setVisibleTodos,
      setTodos,
      addTodo,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [todos, visibleTodos],
  );

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};
