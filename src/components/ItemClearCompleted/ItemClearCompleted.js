import React from 'react';
import PropTypes from 'prop-types';

function ItemClearCompleted({ clearHandler, completedTodos }) {
  return (
    <button
      type="button"
      className="clear-completed"
      onClick={() => clearHandler(completedTodos)}
    >
      Clear completed
    </button>
  );
}

ItemClearCompleted.propTypes = {
  clearHandler: PropTypes.func.isRequired,
  completedTodos: PropTypes.arrayOf.isRequired,
};

export default ItemClearCompleted;
