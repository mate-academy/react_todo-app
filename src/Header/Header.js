import React from 'react';
import PropTypes from 'prop-types';

function Header({ addTodo, inputValue, changeInput }) {
  return (
    <header className="header">
      <h1>todos</h1>

      <input
        onKeyDown={addTodo}
        onChange={changeInput}
        className="new-todo"
        placeholder="What needs to be done?"
        value={inputValue}
      />
    </header>
  );
}

Header.propTypes = {
  addTodo: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  changeInput: PropTypes.func.isRequired,
};

export default Header;
