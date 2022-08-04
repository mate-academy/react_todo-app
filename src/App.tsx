import React from 'react';
import { TodoApp } from './components/TodoApp';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <TodoApp />
      </header>
    </div>
  );
};
