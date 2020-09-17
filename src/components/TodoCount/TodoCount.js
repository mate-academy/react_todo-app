import React from 'react';
import PropTypes from 'prop-types';

export const TodoCount = ({ activeTodos }) => (
  <span className="todo-count">
    {activeTodos.length === 1 && (
      `${activeTodos.length} item left`
    )}

    {activeTodos.length !== 1 && (
      `${activeTodos.length} items left`
    )}
  </span>
);

TodoCount.propTypes = {
  activeTodos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool,
    }).isRequired,
  ).isRequired,
};
