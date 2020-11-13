import React from 'react';

export const ButtonClearCompleted = ({ clearCompleted }) => (
  <button
    type="button"
    className="clear-completed"
    onClick={clearCompleted}
  >
    Clear completed
  </button>
);
