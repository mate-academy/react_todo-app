import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ initialInputValue, handleInputValue, addTodo }) => (
  <header className="header">
    <h1>todos</h1>

    <input
      className="new-todo"
      placeholder="What needs to be done?"
      value={initialInputValue}
      onChange={handleInputValue}
      onKeyPress={addTodo}
    />
  </header>
);

Header.propTypes = {
  addTodo: PropTypes.func.isRequired,
  handleInputValue: PropTypes.func.isRequired,
  initialInputValue: PropTypes.string.isRequired,
};

export default Header;
