/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { TodoContext } from './TodoContext';
import { TodoApp } from './TodoApp';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <TodoContext>
        <TodoApp />
      </TodoContext>
    </div>
  );
};
