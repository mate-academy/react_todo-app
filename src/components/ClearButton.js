import React from 'react';

function ClearButton({ items, clearCompleted }) {
  return (items.some(item => item.completed))
    && (
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

export default ClearButton;
