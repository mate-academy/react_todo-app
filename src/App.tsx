/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { TodoApp } from './Components/TodoApp/TodoApp';
import { GlobalStateProvider } from './Context/TodoContext';

export const App: React.FC = () => {
  return (
    <GlobalStateProvider>
      <TodoApp />
    </GlobalStateProvider>
  );
};
