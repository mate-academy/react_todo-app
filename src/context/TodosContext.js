import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { todosReducer } from './reducer';
import { LOCAL_STORAGE_KEY } from '../constants';

export const TodosContext = React.createContext([]);
export const DispatchContext = React.createContext(() => {});

export function TodosContextProvider({ children }) {
  const [todos, dispatch] = useReducer(
    todosReducer,
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [],
  );

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <TodosContext.Provider value={todos}>
        {children}
      </TodosContext.Provider>
    </DispatchContext.Provider>
  );
}

TodosContextProvider.propTypes = {
  children: PropTypes.node,
};

TodosContextProvider.defaultProps = {
  children: null,
};
