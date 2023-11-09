/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { TodoApp } from './components/TodoApp';
import { TodoContext, defaultValue } from './components/TodoContext';

export const App: React.FC = () => {
  return (
    <TodoContext.Provider value={defaultValue}>
      <TodoApp />
    </TodoContext.Provider>
  );
};
