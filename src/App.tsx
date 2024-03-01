import React from 'react';
import { GlobalStateProvider } from './Store';
import { TodoApp } from './components/TodoApp/TodoApp';

export const App: React.FC = () => {
  return (
    <GlobalStateProvider>
      <TodoApp />
    </GlobalStateProvider>
  );
};
