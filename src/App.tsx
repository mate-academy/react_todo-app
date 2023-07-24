/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import TodoWidget from './components/TodoWidget';
import { TodoProvider } from './context/todo.context';

export const App: React.FC = () => {
  return (
    <TodoProvider>
      <TodoWidget />
    </TodoProvider>
  );
};
