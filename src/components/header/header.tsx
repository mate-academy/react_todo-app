import React from 'react';
import { TodoApp } from './TodoApp';

export const Header: React.FC = () => (
  <header className="header">
    <h1>todos</h1>
    <TodoApp />
  </header>
);
