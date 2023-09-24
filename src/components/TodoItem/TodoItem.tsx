import {
  memo,
  useRef,
  useState,
  useEffect,
  useContext,
} from 'react';
import classNames from 'classnames';

import { Action, Todo } from '../../types';
import { TodosContext } from '../TodosProvider';

type Props = {
  item: Todo;
};

export const TodoItem: React.FC<Props> = memo(({ item }) => {
  const { dispatch } = useContext(TodosContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTitle, setEditingTitle] = useState('');
  const editInputRef = useRef<HTMLInputElement | null>(null);

  const { id, title, completed } = item;

  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [isEditing]);

  const startEditing = () => {
    setIsEditing(true);
    setEditingTitle(title);
  };

  const stopEditing = () => {
    setIsEditing(false);
    setEditingTitle('');
  };

  const submitEdit = () => {
    if (!isEditing) {
      return;
    }

    const newTitle = editingTitle.trim();

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

    stopEditing();
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
    startEditing();
  };

  const handleEditKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      submitEdit();
    }
  };

  const handleEditKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      stopEditing();
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
        value={editingTitle}
        onBlur={submitEdit}
        onKeyUp={handleEditKeyUp}
        onKeyDown={handleEditKeyDown}
        onChange={event => setEditingTitle(event.target.value)}
      />
    </li>
  );
});
