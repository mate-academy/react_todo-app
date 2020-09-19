import React from 'react';
import PropTypes from 'prop-types';

export const TodoCount = ({ activeTodos }) => (
  <span className="todo-count">
    {activeTodos === 1 && (
      `${activeTodos} item left`
    )}

    {activeTodos !== 1 && (
      `${activeTodos} items left`
    )}
  </span>
);

TodoCount.propTypes = {
  activeTodos: PropTypes.number.isRequired,
};
