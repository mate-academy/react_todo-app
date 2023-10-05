import React from 'react';
import { TodoApp } from './components/TodoApp/TodoApp';
import { TodosContext } from './components/TodosContext';

export const App: React.FC = () => {
  return (
    <TodosContext>
      <TodoApp />
    </TodosContext>
  );
};
