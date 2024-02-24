/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import cn from 'classnames';
import { DispatchContext } from '../../managment/Contextes';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoItems: React.FC<Props> = ({ todo }) => {
  const dispatch = useContext(DispatchContext);
  const { id, title, completed } = todo;

  const [editedTitle, setEditedTitle] = useState(title);
  const [isEdit, setIsEdit] = useState(false);

  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEdit && titleRef.current) {
      titleRef.current.focus();
    }
  }, [isEdit]);

  const handleCheckTodo = () => {
    dispatch({
      type: 'marcToComplited',
      id,
    });
  };

  const handleEditTodo = () => {
    if (editedTitle.trim()) {
      dispatch({
        type: 'editTitle',
        newTitle: editedTitle,
        id,
      });
    } else {
      dispatch({
        type: 'removeTodo',
        id,
      });
    }

    setIsEdit(false);
  };

  const handleDoubleClick = () => {
    setIsEdit(true);
  };

  const handleKeyClick = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'Escape':
        setEditedTitle(title);
        setIsEdit(false);
        break;

      case 'Enter':
        handleEditTodo();
        break;

      default:
        break;
    }
  };

  const deleteTodo = () => {
    dispatch({
      type: 'removeTodo',
      id,
    });
  };

  return (
    <li className={cn({
      completed,
      editing: isEdit,
    })}
    >
      <div className="view" onDoubleClick={handleDoubleClick}>
        <input
          type="checkbox"
          className="toggle"
          id={`toggle-${id}`}
          checked={completed}
          onChange={handleCheckTodo}
        />
        <label htmlFor={`toggle-${id}`}>{title}</label>
        <button
          type="button"
          className="destroy"
          onClick={deleteTodo}
        />
      </div>
      {isEdit ? (
        <input
          type="text"
          ref={titleRef}
          className="edit"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          onBlur={handleEditTodo}
          onKeyUp={handleKeyClick}
        />
      ) : null}
    </li>
  );
};
