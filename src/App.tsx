import React from 'react';
import { TodoApp } from './components/TodoApp';
import { TodosProvider } from './TodosContext';

export const App: React.FC = () => (
  <TodosProvider>
    <TodoApp />
  </TodosProvider>
);
