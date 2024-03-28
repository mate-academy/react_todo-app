/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { TodoApp } from './components/TodoApp';
import { GlobalStateProvider } from './components/TodosContext';

export const App: React.FC = () => (
  <GlobalStateProvider>
    <TodoApp />
  </GlobalStateProvider>
);
