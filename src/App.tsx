/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { TodoProvider } from './entities/TodoContex';
import { TodoApp } from './components/TodoApp';

export const App: React.FC = () => {
  return (
    <TodoProvider>
      <TodoApp />
    </TodoProvider>
  );
};
