import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { todosReducer } from './reducer';

const initialState = [];

export const TodosContext = React.createContext(initialState);
export const DispatchContext = React.createContext(() => {});

export function TodosContextProvider({ children }) {
  const [todos, dispatch] = useReducer(todosReducer, initialState);

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
