/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { TodosProvider } from './TodosContext';
import { TodoApp } from './components/TodoApp';

export const App: React.FC = () => (
  <TodosProvider>
    <TodoApp />
  </TodosProvider>
);
