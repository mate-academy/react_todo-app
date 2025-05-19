import React, { useReducer, useEffect } from 'react';
import { TodoContext } from './TodoContext';
import { todoReducer, initialState } from './todoReducer';
import { storage } from '../utils/localStorage';

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  useEffect(() => {
    const todos = storage.load();

    dispatch({ type: 'LOAD_TODOS', payload: { todos } });
  }, []);

  useEffect(() => {
    storage.save(state.todos);
  }, [state.todos]);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};
