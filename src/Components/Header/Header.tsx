import React from 'react';

import { TodoAddForm } from '../TodoAddForm/TodoAddForm';

export const Header: React.FC = () => (
  <header className="header">
    <h1>todos</h1>
    <TodoAddForm />
  </header>
);
