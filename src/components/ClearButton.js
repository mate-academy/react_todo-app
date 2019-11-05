import React from 'react';

function ClearButton({ items, clearCompleted }) {
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

export default ClearButton;
