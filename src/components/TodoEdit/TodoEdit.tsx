import React from 'react';

interface TodoEditProps {
  handleEditedTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleInputBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  editedTitle: string;
  isEditing: boolean;
}

export const TodoEdit: React.FC<TodoEditProps> = ({
  handleEditedTitle,
  handleKeyDown,
  handleInputBlur,
  editedTitle,
  isEditing,
}) => {
  if (!isEditing) {
    return null;
  }

  return (
    <form>
      <input
        data-cy="TodoTitleField"
        type="text"
        className="todo__title-field"
        placeholder="Empty todo will be deleted"
        value={editedTitle}
        onChange={handleEditedTitle}
        onKeyDown={handleKeyDown}
        onBlur={handleInputBlur}
        autoFocus
      />
    </form>
  );
};
