import React, { useState, useMemo } from 'react';
import { Todo } from './types';

function useLocalStorage(key: string, defaultValue: Todo[]) {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem(key);

    if (savedTodos === null) {
      return defaultValue;
    }

    try {
      return JSON.parse(savedTodos);
    } catch (error) {
      localStorage.removeItem(key);

      return defaultValue;
    }
  });

  function saveTodos(newTodos: Todo[]) {
    setTodos(newTodos);

    localStorage.setItem(key, JSON.stringify(newTodos));
  }

  return [todos, saveTodos] as const;
}

type InitialProps = {
  todos: Todo[];
  setTodos: (arg: Todo[]) => void;
};

const initialTodo = {
  todos: [],
  setTodos: () => {},
};

export const TodoStateContext = React.createContext<InitialProps>(initialTodo);

type Props = {
  children: React.ReactNode;
};

export const StorageContextProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage('list', []);

  const todosValue = useMemo(() => [todos, setTodos], [todos, setTodos]);

  const obj = {
    todos: todosValue[0],
    setTodos: todosValue[1],
  };

  return (
    <TodoStateContext.Provider value={obj}>
      {children}
    </TodoStateContext.Provider>
  );
};
