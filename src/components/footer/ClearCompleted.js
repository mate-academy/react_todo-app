import React from 'react';
import PropTypes from 'prop-types';

const ClearCompleted = ({ couldClear, clearCompleted }) => (
  <button
    value="hello"
    type="button"
    className="clear-completed"
    style={{ display: 'block' }}
    onClick={() => clearCompleted()}
  >
    {couldClear
    && 'Clear completed'}
  </button>
);

ClearCompleted.propTypes = {
  couldClear: PropTypes.bool.isRequired,
  clearCompleted: PropTypes.func.isRequired,
};

export default ClearCompleted;
