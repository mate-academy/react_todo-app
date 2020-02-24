import React from 'react';
import PropTypes from 'prop-types';

export function Header(props) {
  const { handleAddTodo } = props;

  return (
    <header className="header">
      <h1>todos</h1>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        onKeyDown={handleAddTodo}
      />
    </header>
  );
}

Header.propTypes = {
  handleAddTodo: PropTypes.func.isRequired,
};
