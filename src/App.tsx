import React from 'react';
// import { Outlet } from 'react-router-dom';
import { TodoApp } from './components/TodoApp';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <TodoApp />
    </div>
  );
};
