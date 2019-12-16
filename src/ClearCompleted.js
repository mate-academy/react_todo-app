import React from 'react';
import PropTypes from 'prop-types';

const ClearCompleted = ({ completedCount, clearCompleted }) => (

  <button
    type="button"
    className={completedCount > 0
      ? 'clear-completed'
      : 'clear-completed hidden'}
    onClick={clearCompleted}
  >
    Clear completed
  </button>
);

ClearCompleted.propTypes = {
  completedCount: PropTypes.number.isRequired,
  clearCompleted: PropTypes.func.isRequired,
};

export default ClearCompleted;
