import React from 'react';
import PropTypes from 'prop-types';

function TodoLeftCounter({ todo, done }) {
  return (
    <span className="todo-count">
      {`${todo} items left, ${done} completed`}
    </span>
  );
}

TodoLeftCounter.propTypes = {
  todo: PropTypes.number.isRequired,
  done: PropTypes.number.isRequired,
};

export default TodoLeftCounter;
