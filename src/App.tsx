/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

import { TodoApp } from './components/TodoApp';
import { ContextProvider } from './components/ContextProvider';

export const App: React.FC = () => {
  return (
    <ContextProvider>
      <TodoApp />
    </ContextProvider>
  );
};
