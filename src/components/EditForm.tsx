import React, { useEffect } from 'react';
import { ESCAPE_KEY } from '../constants/appConstants';

type Props = {
  value: string;
  onValueChange: (value: string) => void;
  changeEditing: (eidting: boolean) => void;
  onSubmit: () => void;
};

export const EditForm: React.FC<Props> = ({
  value,
  onValueChange,
  changeEditing,
  onSubmit,
}) => {
  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === ESCAPE_KEY) {
        changeEditing(false);
      }
    };

    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [changeEditing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        data-cy="TodoTitleField"
        type="text"
        className="todo__title-field"
        placeholder="Empty todo will be deleted"
        value={value}
        onChange={e => onValueChange(e.target.value)}
        autoFocus
        onBlur={onSubmit}
      />
    </form>
  );
};
