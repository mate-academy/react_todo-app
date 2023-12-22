/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { GlobalStateProvider } from './contexts/TodosContext';
import { Todos } from './components';

export const App: React.FC = () => {
  return (
    <GlobalStateProvider>
      <Todos />
    </GlobalStateProvider>
  );
};
