import React from 'react';
import { ButtonClearCompletedShape } from
  '../../shapes/ButtonClearCompletedShape';

export const ButtonClearCompleted = ({ clearCompleted }) => (
  <button
    type="button"
    className="clear-completed"
    onClick={clearCompleted}
  >
    Clear completed
  </button>
);

ButtonClearCompleted.propTypes = ButtonClearCompletedShape;
