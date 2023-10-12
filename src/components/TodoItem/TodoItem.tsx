import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { LoadingContext } from '../../context/LoadingContext';
import { Todo } from '../../types/Todo';

type Props = {
  id: number,
  title: string,
  completed: boolean,
  deleteCurrentTodo?: (todoId: number) => void,
  updateCurrentTodo?: (todoId: number, data: Partial<Todo>) => void,
};

export const TodoItem: React.FC<Props> = ({
  id,
  title,
  completed,
  deleteCurrentTodo,
  updateCurrentTodo,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const { isTodoLoading } = useContext(LoadingContext);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleEditing = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(event.target.value);
  };

  const applyChanges = () => {
    if (!editedTitle) {
      deleteCurrentTodo?.(id);
    } else if (editedTitle !== title) {
      updateCurrentTodo?.(id, { title: editedTitle });
    }

    setIsEditing(false);
  };

  const handleApplyChanges = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      applyChanges();
    }

    if (event.key === 'Escape') {
      setEditedTitle(title);
      setIsEditing(false);
    }
  };

  return (
    <div
      className={classNames('todo', {
        completed,
      })}
    >
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() => updateCurrentTodo?.(id, { completed: !completed })}
        />
      </label>

      {isEditing ? (
        <form>
          <input
            type="text"
            className="todo__title-field"
            value={editedTitle}
            onChange={handleEditing}
            onKeyDown={handleApplyChanges}
            onBlur={applyChanges}
            ref={inputRef}
          />
        </form>
      ) : (
        <>
          <span
            className="todo__title"
            onDoubleClick={() => setIsEditing(true)}
          >
            {editedTitle}
          </span>
          <button
            type="button"
            className="todo__remove"
            onClick={() => deleteCurrentTodo?.(id)}
          >
            ×
          </button>
        </>
      )}

      <div
        className={classNames(
          'modal overlay', {
            'is-active': isTodoLoading(id),
          },
        )}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
