import React, { useState } from 'react';
import { Todo } from './Types/Todo';
import { useLocalStorage } from './localStorageHook/localStorage';

interface DefaultValue {
  todos: Todo[];
  setTodos: (value: Todo[]) => void;
  visibleTodos: Todo[];
  setVisibleTodos: (value: Todo[]) => void;
}

const defaultValue: DefaultValue = {
  todos: [],
  setTodos: () => {},
  visibleTodos: [],
  setVisibleTodos: () => {},
};

export const TodoContext = React.createContext(defaultValue);

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);

  const value = {
    todos,
    setTodos,
    visibleTodos,
    setVisibleTodos,
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};
