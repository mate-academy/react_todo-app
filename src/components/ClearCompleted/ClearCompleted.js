import React from 'react';
import PropTypes from 'prop-types';

const ClearCompleted = ({ clearCompleted }) => (
  <button type="button" className="clear-completed" onClick={clearCompleted}>
    Clear completed
  </button>
);

export default ClearCompleted;

ClearCompleted.propTypes = {
  clearCompleted: PropTypes.func.isRequired,
};
