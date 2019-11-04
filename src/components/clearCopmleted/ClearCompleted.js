import React from 'react';
import PropTypes from 'prop-types';

function ClearCompleted({ isVisible, deleteCompleted }) {
  return (
    <button
      className="clear-completed"
      type="button"
      style={
        isVisible
          ? { display: 'block' }
          : { display: 'none' }}
      onClick={deleteCompleted}
    >
      Clear completed
    </button>
  );
}

ClearCompleted.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  deleteCompleted: PropTypes.func.isRequired,
};

export default ClearCompleted;
