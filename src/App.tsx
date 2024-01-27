/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { TodoApp } from './components/TodoApp/TodoApp';
import { TodosFilter } from './components/TodosFilter/TodosFilter';
import { TodosProvider } from './TodosContext';

export const App: React.FC = () => {
  return (
    <TodosProvider>
      <TodoApp />
      <TodosFilter />
    </TodosProvider>
  );
};
