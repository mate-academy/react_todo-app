import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import cn from 'classnames';

import { Todo } from './types/Todo';
import { DispatchContext } from './management/TodoContext';

interface Props {
  todo: Todo;
}

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

  const handleDoubleClick = () => {
    setIsEdited(true);
  };

  const handleEditTodoTitle = () => {
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

  const handlerKeyUp = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Escape') {
      setEditedTitle(title);
      setIsEdited(false);
    }

    if (event.key === 'Enter') {
      handleEditTodoTitle();
    }
  };

  return (
    <li className={cn({
      completed: completed === true,
      editing: isEdited,
    })}
    >

      <div
        className="view"
        onDoubleClick={handleDoubleClick}
      >
        <input
          type="checkbox"
          className="toggle"
          checked={completed}
          onChange={handleCompleted}
        />
        <label>{title}</label>

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
        onChange={(event) => setEditedTitle(event.target.value)}
        onKeyUp={handlerKeyUp}
        onBlur={handleEditTodoTitle}
      />
    </li>

  );
};
