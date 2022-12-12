/* eslint-disable jsx-a11y/control-has-associated-label */
import { useCallback, useState } from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  item: Todo;
  onToggleComplete: (item: Todo) => void;
  onDelete: (item: Todo) => void;
  onEditingMode: (itemId: number) => void;
  onEdit: (todo: Todo, title: string) => void;
}

export const TodoItem: React.FC<Props> = ({
  item,
  onToggleComplete,
  onDelete,
  onEditingMode,
  onEdit,
}) => {
  const [updatedTitle, setUpdatedTitle] = useState(item.title);
  const [editModeOn, setEditModeOn] = useState(false);

  const handleEdit = useCallback(
    () => {
      setEditModeOn(true);
      onEditingMode(item.id);
    },
    [item],
  );

  const handleSave = useCallback(() => {
    setEditModeOn(false);
    onEditingMode(-1);
    if (updatedTitle.length > 0) {
      onEdit(item, updatedTitle);
    } else {
      onDelete(item);
    }
  }, [item, updatedTitle]);

  const handleUpdate = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Escape' && editModeOn) {
        setEditModeOn(false);
        onEditingMode(-1);
        setUpdatedTitle(item.title);
      }

      if (event.key === 'Enter' && editModeOn) {
        handleSave();
      }
    },
    [item, editModeOn, updatedTitle],
  );

  return (
    <>
      {editModeOn
        ? (
          <input
            type="text"
            className="edit"
            ref={input => input && input.focus()}
            value={updatedTitle}
            onChange={(event) => setUpdatedTitle(event.target.value.trim())}
            onBlur={handleSave}
            onKeyDown={handleUpdate}
          />
        )
        : (
          <div className="view">
            <input
              type="checkbox"
              className="toggle"
              id={`toggle-view${item.id}`}
              checked={item.completed}
              onChange={() => onToggleComplete(item)}
            />

            <label
              onDoubleClick={handleEdit}
            >
              {item.title}
            </label>

            <button
              type="button"
              aria-label="Delete Todo"
              className="destroy"
              data-cy="deleteTodo"
              onClick={() => onDelete(item)}
            />
          </div>
        )}
    </>
  );
};
