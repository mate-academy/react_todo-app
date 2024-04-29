import React, { FC, useCallback, useContext, useEffect, useRef } from 'react';
import { TodoContext } from '../../Context/TodoContext';

interface IProps {
  id: string;
  title: string;
  handleSubmit: (e: React.FormEvent | MouseEvent, id: string) => void;
  onCancel: (id: string) => void;
}

export const MainEditForm: FC<IProps> = ({
  id,
  title,
  handleSubmit,
  onCancel,
}) => {
  const editFormRef = useRef<HTMLFormElement>(null);
  const { editTask } = useContext(TodoContext);

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (
        editFormRef.current &&
        !editFormRef.current.contains(e.target as Node)
      ) {
        handleSubmit(e, id);
      }
    },
    [handleSubmit, id],
  );

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      onCancel(id);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => handleClickOutside(e);

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [handleClickOutside]);

  return (
    <form ref={editFormRef} onSubmit={e => handleSubmit(e, id)}>
      <label htmlFor="TodoTitleField">
        <input
          onKeyDown={handleKeyUp}
          id="TodoTitleField"
          data-cy="TodoTitleField"
          type="text"
          className="todo__title-field"
          placeholder="Empty todo will be deleted"
          value={title}
          onChange={e => editTask(id, e.target.value)}
          autoFocus
        />
      </label>
    </form>
  );
};
