import React from 'react';

import NewTodo from '../UI/NewTodo';

const Header: React.FC = () => {
  return (
    <header className="header">
      <h1>todos</h1>

      <NewTodo />
    </header>
  );
};

export default Header;
