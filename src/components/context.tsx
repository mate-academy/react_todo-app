import React, { useState, ReactNode } from 'react';
import { Todo } from '../types/Todo';
import { User } from '../types/User';

type ContextValue = {
  todos: Todo[]
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  userError: string,
  setUserError: React.Dispatch<React.SetStateAction<string>>,
  userErrorHide: boolean,
  setUserErrorHide: React.Dispatch<React.SetStateAction<boolean>>,
  loaderTodos: number [],
  setLoaderTodos: React.Dispatch<React.SetStateAction<number[]>>,
  changeUserButton: boolean,
  setChangeUserButton: React.Dispatch<React.SetStateAction<boolean>>,
  error: (text: string) => void
};

export const Context = React.createContext<ContextValue>({
  todos: [],
  setTodos: () => {},

  user: null,
  setUser: () => {},

  userError: '',
  setUserError: () => {},

  userErrorHide: false,
  setUserErrorHide: () => {},

  loaderTodos: [],
  setLoaderTodos: () => {},

  changeUserButton: false,
  setChangeUserButton: () => {},

  error: () => {},
});

type Props = {
  children: ReactNode
};

export const ContextProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [user, setUser] = useState<User | null>(null);

  const [userError, setUserError] = useState('');
  const [userErrorHide, setUserErrorHide] = useState(false);

  const [loaderTodos, setLoaderTodos] = useState<number[]>([]);

  const [
    changeUserButton,
    setChangeUserButton,
  ] = useState(window.location.hash === '#/todos');

  const error = (text: string) => {
    setUserError(text);
    setUserErrorHide(true);
    setTimeout(() => {
      setUserErrorHide(false);
    }, 4000);
  };

  const contextValue:ContextValue = {
    todos,
    setTodos,

    user,
    setUser,

    userError,
    setUserError,

    userErrorHide,
    setUserErrorHide,

    loaderTodos,
    setLoaderTodos,

    changeUserButton,
    setChangeUserButton,

    error,
  };

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
};
