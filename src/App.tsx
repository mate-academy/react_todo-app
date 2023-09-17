import React from 'react';
import { TodoApp } from './Components/TodoApp/TodoApp';
import { TodosProvider } from './Context/TodosContext';

export const App: React.FC = () => {
  return (
    <TodosProvider>
      <TodoApp />
    </TodosProvider>
  );
};
