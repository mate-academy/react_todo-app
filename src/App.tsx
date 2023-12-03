import React from 'react';
import { TodosStateProvider } from './context/StateContext';
import { TodoApp } from './components/TodoApp';

export const App: React.FC = () => {
  return (
    <TodosStateProvider>
      <TodoApp />
    </TodosStateProvider>
  );
};
