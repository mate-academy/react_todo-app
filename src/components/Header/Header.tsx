import React from 'react';
import { TodoPanel } from '../TodoPanel';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <h1>todos</h1>
      <TodoPanel />
    </header>
  );
};
