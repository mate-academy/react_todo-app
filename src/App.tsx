import React from 'react';
import { TodoApp } from './components/TodoApp';
import { TodosProvider } from './utils/TodoContext';

export const App: React.FC = () => {
  return (
    <TodosProvider>
      <TodoApp />
    </TodosProvider>
  );
};
