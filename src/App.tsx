import React from 'react';
import { TodoApp } from './Components/TodoApp';
import { StoreProvider } from './Store/Store';

export const App: React.FC = () => {
  return (
    <StoreProvider>
      <TodoApp />
    </StoreProvider>
  );
};
