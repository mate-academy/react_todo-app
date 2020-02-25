import React from 'react';
import PropTypes from 'prop-types';

export function TodoHeader(props) {
  const { handleAddTodo, handleChange, inputValue } = props;

  return (
    <header className="header">
      <h1 className="title">Todos</h1>
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        onKeyDown={handleAddTodo}
        onChange={handleChange}
        value={inputValue}
      />
    </header>
  );
}

TodoHeader.propTypes = {
  handleAddTodo: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
};
