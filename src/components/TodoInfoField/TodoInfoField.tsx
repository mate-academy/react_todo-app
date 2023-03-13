import React from 'react';
import { Props } from './Props';

export const TodoInfoField: React.FC<Props> = ({
  setIsEditing,
  onDelete,
  todo,
}) => (
  <>
    <span
      className="todo__title"
      role="button"
      tabIndex={0}
      onClick={(e) => setIsEditing(e.detail === 2)}
      onKeyDown={() => {}}
    >
      {todo.title}
    </span>
    <button
      type="button"
      className="todo__remove"
      data-cy="deleteTodo"
      onClick={() => onDelete(todo.id)}
    >
      ×
    </button>
  </>
);
