import React from 'react';
import PropTypes from 'prop-types';

function TodoApp({ handleSubmit, handleTitleChange, value }) {
  return (
    <header className="header">
      <h1>todos</h1>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        onChange={handleTitleChange}
        onKeyPress={handleSubmit}
        value={value}
      />
    </header>
  );
}

TodoApp.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default TodoApp;
