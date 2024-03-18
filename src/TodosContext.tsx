import React, { useMemo, useState } from 'react';
import { Todo } from './types/Todo';

type Props = {
  children: React.ReactNode;
};

type ContextType = {
  todos: Todo[];
  visibleTodos: Todo[];
  setVisibleTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  addTodo: (todo: Todo) => void;
};

export const TodosContext = React.createContext<ContextType>({
  todos: [],
  visibleTodos: [],
  setVisibleTodos: () => {},
  setTodos: () => {},
  addTodo: () => {},
});

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [visibleTodos, setVisibleTodos] = useState(todos);

  const addTodo = (todo: Todo) => {
    setTodos(prevTodos => [todo, ...prevTodos]);
    setVisibleTodos(prevVisibleTodos => [todo, ...prevVisibleTodos]);
  };

  const value = useMemo(
    () => ({
      todos,
      visibleTodos,
      setVisibleTodos,
      setTodos,
      addTodo,
    }),
    [todos, visibleTodos],
  );

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};
