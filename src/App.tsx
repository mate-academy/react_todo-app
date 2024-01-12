import React from 'react';
import { GlobalStateProvider } from './store/store';
import { TodoApp } from './components/TodoApp/TodoApp';

export const App: React.FC = () => {
  return (
    <GlobalStateProvider>
      <TodoApp />
    </GlobalStateProvider>
  );
};
