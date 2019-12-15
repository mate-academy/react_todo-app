import React from 'react';
import PropTypes from 'prop-types';

const TodoApp = ({ createNewTodo, addNewTodo, enterNewTodo }) => (
  <form onSubmit={addNewTodo}>
    <input
      className="new-todo"
      placeholder="What needs to be done?"
      onChange={enterNewTodo}
      value={createNewTodo}
    />
  </form>
);

TodoApp.propTypes = {
  createNewTodo: PropTypes.string.isRequired,
  addNewTodo: PropTypes.func.isRequired,
  enterNewTodo: PropTypes.func.isRequired,
};

export default TodoApp;
