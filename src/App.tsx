/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { TodoProvider } from './TodoContext';
import { TodoApp } from './components/todo_app/todo_app';

export const App: React.FC = () => {
  return (
    <TodoProvider>
      <div className="todoapp">
        <TodoApp />
      </div>
    </TodoProvider>
  );
};
