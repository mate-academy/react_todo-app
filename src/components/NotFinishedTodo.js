import React from 'react';
import PropTypes from 'prop-types';

export const NotFinishedTodo = ({ notFinishedTodo }) => (
  <span className="todo-count">
    {`${notFinishedTodo.length} items left`}
  </span>
);

NotFinishedTodo.propTypes = {
  notFinishedTodo: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
};
