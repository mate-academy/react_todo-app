import React from 'react';
import PropTypes from 'prop-types';

export const TodoCount = ({ activeTodosLength }) => (
  <span className="todo-count">
    {activeTodosLength === 1 && (
      `${activeTodosLength} item left`
    )}

    {activeTodosLength !== 1 && (
      `${activeTodosLength} items left`
    )}
  </span>
);

TodoCount.propTypes = {
  activeTodosLength: PropTypes.number.isRequired,
};
