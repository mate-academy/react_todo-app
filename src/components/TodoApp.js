import React from 'react';
import PropTypes from 'prop-types';

const TodoApp = ({
  onCreateTodo,
  title,
  setTitle,
}) => (
  <form onSubmit={onCreateTodo}>
    <input
      type="text"
      className="new-todo"
      placeholder="What needs to be done?"
      value={title}
      onChange={event => setTitle(event.target.value)}
    />
  </form>
);

TodoApp.propTypes = {
  onCreateTodo: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
};

export default TodoApp;
