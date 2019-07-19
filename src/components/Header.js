import React from 'react';
import PropTypes from 'prop-types';

function Header(props) {
  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={props.handleSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          name="title"
          onChange={props.handleType}
          value={props.todoValue}
        />
      </form>
    </header>
  );
}

Header.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleType: PropTypes.func.isRequired,
  todoValue: PropTypes.string.isRequired,
};

export default Header;
