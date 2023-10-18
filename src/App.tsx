import React from 'react';

import './App.scss';
import { TodoApp } from './components/TodoApp/TodoApp';
import { GlobalStateProvider } from './components/TodosContext';

export const App: React.FC = () => {
  return (
    <GlobalStateProvider>
      <TodoApp />
    </GlobalStateProvider>
  );
};
