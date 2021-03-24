import React from 'react';

export const TodoContext = React.createContext({
  todos: [],
  setTodo: () => {},
  isAllCompleted: false,
  setIsAllCompleted: () => {},
});
