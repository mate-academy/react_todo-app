import React from 'react';
import PropTypes from 'prop-types';

function ClearBtn({ items, clearCompleted }) {
  if (items.some(item => item.completed)) {
    return (
      <button
        type="button"
        onClick={clearCompleted}
        className="clear-completed"
        style={{ display: 'block' }}
      >
        Clear completed
      </button>
    );
  }

  return '';
}

ClearBtn.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  clearCompleted: PropTypes.func.isRequired,
};

export default ClearBtn;
