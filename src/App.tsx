/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { TodoApp } from './components/TodoApp';

const userId = 3456;

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <TodoApp userId={userId} />
    </div>
  );
};
