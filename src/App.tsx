import React from 'react';
import { TodosProvider } from './TodoApp/TodosContext';
import { TodoApp } from './TodoApp/TodoApp';

export const App: React.FC = () => {
  return (
    <TodosProvider>
      <TodoApp />
    </TodosProvider>
  );
};
