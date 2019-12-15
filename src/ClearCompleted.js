import React from 'react';
import PropTypes from 'prop-types';

const ClearCompleted = ({ completedCount, clearCompleted }) => (

  <button
    type="button"
    className="clear-completed"
    style={completedCount > 0 ? { display: 'block' } : { display: 'none' }}
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
