/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { TodosProvider } from './utils/TodoContext';
import { TodoMainApp } from './components/TodoMainApp';

export const App: React.FC = () => {
  return (
    <TodosProvider>
      <TodoMainApp />
    </TodosProvider>
  );
};
