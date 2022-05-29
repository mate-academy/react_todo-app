import React, { useState, useEffect, useMemo } from 'react';
import { getTodos, getUser, newUser } from '../api/api';

type Context = {
  todos: Todo[],
  setTodos: (todos: Todo[] | ((prevState: Todo[]) => Todo[])) => void,
  user: User | null,
};

export const TodoContext = React.createContext<Context>({
  todos: [],
  setTodos: () => {},
  user: null,
});

export const TodoProvider: React.FC = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [user, setUser] = useState<User | null>(null);

  const loadUser = async (userName: string) => {
    const person = await getUser(userName);

    if (person.length === 0) {
      newUser(
        'Dina Samoilova',
        'DinaSamoilova',
        'dina.samoilova13@gmail.com',
        '+380679326850',
      )
        .then(setUser);
    } else {
      setUser(person[0]);
    }
  };

  useEffect(() => {
    loadUser('DinaSamoilova');
  }, []);

  const loadTodos = async (userId: number) => {
    const allTodos = await getTodos(userId);

    setTodos(allTodos);
  };

  useEffect(() => {
    if (user) {
      loadTodos(user.id);
    }
  }, [user]);

  const contextValue = useMemo(() => {
    return {
      todos,
      setTodos,
      user,
    };
  }, [todos, user]);

  return (
    <TodoContext.Provider value={contextValue}>
      {children}
    </TodoContext.Provider>
  );
};
