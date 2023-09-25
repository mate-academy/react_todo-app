import {
  memo,
  useRef,
  useState,
  useEffect,
} from 'react';
import classNames from 'classnames';

import { Action, Todo } from '../../types';
import { useTodos } from '../../hooks';

type Props = {
  item: Todo;
};

export const TodoItem: React.FC<Props> = memo(({ item }) => {
  const { dispatch } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(item.title);
  const editInputRef = useRef<HTMLInputElement | null>(null);

  const { id, title, completed } = item;

  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [isEditing]);

  const submitEdit = () => {
    if (!isEditing) {
      return;
    }

    const newTitle = editedTitle.trim();

    if (!newTitle) {
      dispatch({
        type: Action.Remove,
        payload: id,
      });
    } else if (newTitle !== title) {
      dispatch({
        type: Action.Edit,
        payload: { id, title: newTitle },
      });
    }

    setIsEditing(false);
  };

  const handleCheckboxChange = () => {
    dispatch({
      type: Action.Toggle,
      payload: id,
    });
  };

  const handleDeleteClick = () => {
    dispatch({
      type: Action.Remove,
      payload: id,
    });
  };

  const handleTitleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleEditKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      submitEdit();
    }
  };

  const handleEditKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setIsEditing(false);
    }
  };

  return (
    <li
      className={classNames({
        completed,
        editing: isEditing,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={completed}
          onChange={handleCheckboxChange}
        />

        <label onDoubleClick={handleTitleDoubleClick}>
          {title}
        </label>

        <button
          type="button"
          className="destroy"
          aria-label="Delete"
          data-cy="deleteTodo"
          onClick={handleDeleteClick}
        />
      </div>

      <input
        type="text"
        className="edit"
        ref={editInputRef}
        value={editedTitle}
        onBlur={submitEdit}
        onKeyUp={handleEditKeyUp}
        onKeyDown={handleEditKeyDown}
        onChange={event => setEditedTitle(event.target.value)}
      />
    </li>
  );
});
