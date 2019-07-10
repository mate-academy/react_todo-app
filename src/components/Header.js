import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ addTask }) => (
  <header className="header">
    <h1>todos</h1>
    <input
      type="text"
      className="new-todo"
      placeholder="What needs to be done?"
      onKeyPress={addTask}
      onBlur={addTask}
    />
  </header>
);

Header.propTypes = {
  addTask: PropTypes.func.isRequired,
};

export default Header;
