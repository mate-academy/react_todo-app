/* eslint-disable import/extensions */
import React from 'react';
import { TodosProvider } from './components/Contexts';
import { TodoApp } from './components/TodoApp';

export const App: React.FC = () => {
  return (
    <TodosProvider>
      <TodoApp />
    </TodosProvider>
  );
};
