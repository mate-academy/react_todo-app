import React from 'react';
import PropTypes from 'prop-types';

const ClearBtn = ({ todoList, deleteAllCompletedTodos }) => (
  <button
    type="button"
    className="clear-completed"
    style={{ display: 'block' }}
    onClick={deleteAllCompletedTodos}
  >
    {todoList.some(todo => todo.completed === true) && 'Clear Completed'}
  </button>
);

ClearBtn.propTypes = {
  todoList: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteAllCompletedTodos: PropTypes.func.isRequired,
};

export default ClearBtn;
