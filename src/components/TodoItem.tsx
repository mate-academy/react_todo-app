import React, { useContext, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { DispatchContext } from '../managment/TodoContext';
import { Todo } from '../types/Types';

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
      type: 'markDone',
      id,
    });
  };

  const handleDeleteTodo = () => {
    dispatch({
      type: 'removeTodo',
      id,
    });
  };

  const handleSaveTodoTitle = () => {
    if (editedTitle.trim()) {
      dispatch({
        type: 'editTitle',
        id,
        newTitle: editedTitle,
      });
      setIsEdited(false);
    } else {
      handleDeleteTodo();
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setEditedTitle(title);
      setIsEdited(false);
    }

    if (e.key === 'Enter') {
      handleSaveTodoTitle();
    }
  };

  return (
    <li className={cn({ completed: completed === true, editing: isEdited })}>
      <div className="view" onDoubleClick={() => setIsEdited(true)}>
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
          onClick={handleDeleteTodo}
        />
      </div>

      <input
        type="text"
        className="edit"
        ref={titleRef}
        value={editedTitle}
        onChange={e => setEditedTitle(e.target.value)}
        onKeyUp={handleKeyUp}
        onBlur={handleSaveTodoTitle}
      />
    </li>
  );
};
