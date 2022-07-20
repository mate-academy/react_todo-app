import React, { useEffect, useMemo, useState } from 'react';
import * as request from '../request/api';

export const TodoContext = React.createContext({
  todos: [],
  setTodos: () => {},
  user: [],
  error: '',
});

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    request.getTodos()
      .then(result => setTodos(result))
      .catch(err => setError(err.message));
  }, []);

  useEffect(() => {
    request.getMyUser()
      .then(result => setUser(result))
      .catch(err => setError(err.message));
  }, []);

  const contextValue = useMemo(() => ({
    todos,
    setTodos,
    user,
    error,
  }), [todos, user, error]);

  return (
    <TodoContext.Provider value={contextValue}>
      {children}
    </TodoContext.Provider>
  );
};
