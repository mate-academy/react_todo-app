import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useLocalStorage } from './customHooks';

export const TodosContext = React.createContext({
  todos: [],
  setNewTodos: () => {},
});

export const TodosProvider = ({ children }) => {
  const [todos, setNewTodos] = useLocalStorage('todos', []);
  const contextValue = useMemo(() => (
    {
      todos,
      setNewTodos,
    }
  ), [todos]);

  return (
    <TodosContext.Provider value={contextValue}>
      {children}
    </TodosContext.Provider>
  );
};

TodosProvider.propTypes = {
  /* eslint-disable */
  children: PropTypes.object.isRequired,
};
