import React from 'react';
import PropTypes from 'prop-types';

export const TodoCount = ({ todoLength }) => (
  <span className="todo-count">
    {`${todoLength} ${todoLength === 1 ? 'item' : 'items'} left`}
  </span>
);

TodoCount.propTypes = {
  todoLength: PropTypes.number.isRequired,
};
