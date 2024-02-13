import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { DispatchContext } from '../contexts/TodoContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useContext(DispatchContext);
  const { id, title, completed } = todo;
  const [editedTitle, setEditedTitle] = useState(title);
  const [isEdited, setIsEdited] = useState(false);
  const titleRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isEdited && titleRef.current) {
      titleRef.current.focus();
    }
  }, [isEdited]);

  const handleCompleted = () => {
    dispatch({
      type: 'markCompleted',
      id,
    });
  };

  const handleRemoveTodo = () => {
    dispatch({
      type: 'removeTodo',
      id,
    });
  };

  const handleTodoSave = () => {
    if (editedTitle.trim()) {
      dispatch({
        type: 'editTitle',
        id,
        newTitle: editedTitle,
      });

      setIsEdited(false);
    } else {
      handleRemoveTodo();
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setEditedTitle(title);
      setIsEdited(false);
    }

    if (e.key === 'Enter') {
      handleTodoSave();
    }
  };

  return (
    <li
      className={classNames({
        completed: completed === true,
        editing: isEdited,
      })}
    >
      <div
        className="view"
        onDoubleClick={() => setIsEdited(true)}
      >
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={completed}
          onChange={handleCompleted}
        />

        <label htmlFor="toggle-view">{title}</label>

        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="Mute volume"
          onClick={handleRemoveTodo}
        />
      </div>

      <input
        type="text"
        className="edit"
        ref={titleRef}
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
        onKeyUp={handleKeyUp}
        onBlur={handleTodoSave}
      />
    </li>
  );
};
