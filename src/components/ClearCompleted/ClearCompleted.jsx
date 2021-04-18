import React from 'react';
import PropTypes from 'prop-types';

export const ClearCompleted = ({ clearAllCompleted }) => (
  <>
    <button
      type="button"
      className="clear-completed"
      onClick={clearAllCompleted}
    >
      Clear completed
    </button>
  </>
);

ClearCompleted.propTypes = {
  clearAllCompleted: PropTypes.func.isRequired,
};
