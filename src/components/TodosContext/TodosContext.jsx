import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const TodosContext = React.createContext({
  todos: [],
  setTodos: () => {},
});

export const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const contextValue = {
    todos,
    setTodos,
  };

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('todos') || '[]');

    setTodos(storage);
  }, []);

  return (
    <TodosContext.Provider value={contextValue}>
      {children}
    </TodosContext.Provider>
  );
};

TodosProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
