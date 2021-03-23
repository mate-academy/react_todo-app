import React from 'react';
import PropTypes from 'prop-types';

export const Form = ({ todoTitle, setTodoTitle, handleSubmit }) => (
  <header className="header">
    <h1>todo app</h1>

    <form
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        value={todoTitle}
        onChange={({ target }) => setTodoTitle(target.value)}
      />
    </form>
  </header>
);

Form.propTypes = {
  todoTitle: PropTypes.string.isRequired,
  setTodoTitle: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
