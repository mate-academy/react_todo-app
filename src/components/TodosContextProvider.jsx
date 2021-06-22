import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { TodosContext } from '../context/TodosContext';
import { todosReducer, actions } from '../reducers/todosReducer';
import { LOCAL_STORAGE_KEY, USER_ID } from '../constants';
import { getUserTodos } from '../api';

export function TodosContextProvider({ children }) {
  const [todos, dispatch] = useReducer(
    todosReducer,
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [],
  );

  useEffect(() => {
    getUserTodos(USER_ID)
      .then(userTodos => dispatch(actions.reset(userTodos)))
      .catch(error => alert(`Failed to fetch todo list; ${error}`));
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  return (
    <TodosContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
}

TodosContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
