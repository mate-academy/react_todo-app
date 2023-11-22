import React from 'react';
import { TodosProvider } from './Components/TodoContext/TodoContext';
import { TodoApp } from './TodoApp/TodoApp';

export const App: React.FC = () => {
  return (
    <TodosProvider>
      <TodoApp />
    </TodosProvider>
  );
};
