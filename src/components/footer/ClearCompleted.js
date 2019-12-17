import React from 'react';
import PropTypes from 'prop-types';

const ClearCompleted = ({ todos, clearCompleted }) => (
  <button
    value="hello"
    type="button"
    className="clear-completed"
    style={{ display: 'block' }}
    onClick={() => clearCompleted()}
  >
    {todos.some(todo => todo.status)
    && 'Clear completed'}
  </button>
);

ClearCompleted.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  clearCompleted: PropTypes.func.isRequired,
};

export default ClearCompleted;
