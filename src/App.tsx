import React from 'react';
import { TodoApp } from './components/TodoApp';
import { GlobalStateProvider } from './TodosContext';

export const App: React.FC = () => {
  return (
    <GlobalStateProvider>
      <TodoApp />
    </GlobalStateProvider>
  );
};
