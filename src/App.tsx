import React from 'react';
import { TodoApp } from './components/TodoApp/TodoApp';
import { TodosProvider } from './components/TodosContext/TodosContext';

export const App: React.FC = () => {
  return (
    <TodosProvider>
      <TodoApp />
    </TodosProvider>
  );
};
