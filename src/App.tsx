/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import TodoApp from './components/todoapp/TodoApp';
import { TodosProvider } from './utils/TodosContext';

export const App: React.FC = () => {
  return (
    <TodosProvider>
      <TodoApp />
    </TodosProvider>
  );
};
