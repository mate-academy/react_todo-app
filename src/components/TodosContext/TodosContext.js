import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

const contextProps = {
  todos: [],
  setTodos: () => {},
};

export const TodosContext = React.createContext(contextProps);

export const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem('todos')) || [],
  );

  const contextValue = useMemo(() => ({
    todos,
    setTodos,
  }), [todos, setTodos]);

  return (
    <TodosContext.Provider value={contextValue}>
      {children}
    </TodosContext.Provider>
  );
};

TodosProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
