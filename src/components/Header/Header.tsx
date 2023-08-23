import React from 'react';
import { NewTodo } from '../NewTodo/NewTodo';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <h1>todos</h1>
      <NewTodo />
    </header>
  );
};
