import React from 'react';
import PropTypes from 'prop-types';

const Header = ({
  todo,
  currentIndex,
  handleChange,
  handleSubmit,
}) => (
  <header className="header">
    <h1>todos</h1>
    <form
      onSubmit={event => handleSubmit(todo, currentIndex, event)}
    >
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        value={todo}
        onChange={handleChange}
      />
    </form>
  </header>
);

Header.propTypes = {
  todo: PropTypes.string,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
}.isRequired;

export default Header;
