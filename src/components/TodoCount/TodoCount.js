import React from 'react';
import PropTypes from 'prop-types';

const TodoCount = ({ uncompletedLength }) => (
  <span className="todo-count">
    {`${uncompletedLength} items left`}
  </span>
);

export default TodoCount;

TodoCount.propTypes = {
  uncompletedLength: PropTypes.number.isRequired,
};
