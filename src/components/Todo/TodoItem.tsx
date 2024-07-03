import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { useTodoApi } from './Context';
import { useState } from 'react';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { id, title, completed } = todo;
  const { handleCompletedChange, handleTitleChange, handleTodoRemove } =
    useTodoApi();
  const [editValue, setEditValue] = useState<string | null>(null);

  const handleInputCompletedChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => handleCompletedChange(id, event.currentTarget.checked);

  const handleEditSave = () => {
    if (editValue !== null) {
      const trimmedTitle = editValue.trim();

      if (!trimmedTitle) {
        handleTodoRemove(id);
      } else if (title !== trimmedTitle) {
        handleTitleChange(id, trimmedTitle);
      }

      setEditValue(null);
    }
  };

  const handleEditStart = () => setEditValue(title);

  const handleEdit = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEditValue(event.currentTarget.value);

  const handleSubmit = (event: React.FormEvent) => {
    handleEditSave();
    event.preventDefault();
  };

  const handleCancel = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setEditValue(null);
    }
  };

  const handleRemove = () => handleTodoRemove(id);

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: completed })}
    >
      <label className="todo__status-label">
        <input
          name="TodoStatus"
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={handleInputCompletedChange}
        />
      </label>

      {editValue !== null ? (
        <form onSubmit={handleSubmit}>
          <input
            name="TodoTitleField"
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={editValue}
            onChange={handleEdit}
            onBlur={handleEditSave}
            onKeyUp={handleCancel}
            autoFocus
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={handleEditStart}
          >
            {title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={handleRemove}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
