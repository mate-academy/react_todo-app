/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { TodoApp } from './components/TodoApp';
import { TodoList } from './components/TodoList';
import { TodoProvider } from './components/TodoContext';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <TodoProvider>
        <h1 className="todoapp__title">todos</h1>
        <TodoApp />
        <TodoList />
      </TodoProvider>
    </div>
  );
};
