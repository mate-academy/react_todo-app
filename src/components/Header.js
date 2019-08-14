import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ title, addTodo, getTodo }) => (
  <header className="header">
    <h1>todos</h1>
    <form onSubmit={addTodo}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        onChange={getTodo}
        value={title}
      />
    </form>
  </header>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
  addTodo: PropTypes.func,
  getTodo: PropTypes.func,
};

export default Header;
