import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

const reducer = (state, action) => {
  // console.log(action)
  switch (action.type) {
    case 'addNewTodo':
      return {
        todos: [...state.todos, action.payload],
      };
    case 'filterActiveTodos':
      return {
        todos: state.todos.filter(({ completed }) => completed),
      };
    default:
      return state;
  }
};

export const initializer = (initialValue = initialState.todos) => {
  try {
    return JSON.parse(localStorage.getItem('todos')) || initialValue;
  } catch {
    return initialValue;
  }
};

const initialState = {
  todos: [],
};

export const DispatchContext = React.createContext(() => { });
export const StateContext = React.createContext(initialState);

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    initializer,
  );

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

StateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
