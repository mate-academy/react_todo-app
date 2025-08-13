import React from 'react';

interface TodoDeleteProps {
  onDelete: () => void;
  isEditing: boolean;
}

export const TodoDelete: React.FC<TodoDeleteProps> = ({
  onDelete,
  isEditing,
}) => {
  if (isEditing) {
    return null;
  }

  return (
    <button
      type="button"
      className="todo__remove"
      data-cy="TodoDelete"
      onClick={onDelete}
    >
      ×
    </button>
  );
};
