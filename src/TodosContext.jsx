import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useLocalStorage } from './customHooks';

const initialState = {};

export const TodosContext = React.createContext({
  todos: [],
  setNewTodos: () => {},
});

export const GlobalState = React.createContext(initialState);

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
      <GlobalState.Provider value={initialState}>
        {children}
      </GlobalState.Provider>
    </TodosContext.Provider>
  );
};

TodosProvider.propTypes = {
  /* eslint-disable */
  children: PropTypes.object.isRequired,
};
