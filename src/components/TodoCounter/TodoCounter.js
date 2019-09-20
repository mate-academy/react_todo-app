import React from 'react';
// import PropTypes from 'prop-types';

const TodoCounter = ({ ToDo, done }) => (
  <span className="todo-count">
    {`${ToDo} items left, ${done} completed`}
  </span>
);

// TodoCounter.propTypes = {};

export default TodoCounter;
