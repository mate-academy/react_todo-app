/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import cn from 'classnames';
import { Todo } from '../types/Todo';
import { DispatchContext } from './TodosContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { id, title, completed } = todo;
  const dispatch = useContext(DispatchContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const titleField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && titleField.current) {
      titleField.current.focus();
    }
  }, [isEditing]);

  const handleChangeCompleted = () => {
    dispatch({
      type: 'changeCompleted',
      payload: id,
    });
  };

  const handleRemoveTodo = () => {
    dispatch({
      type: 'removeTodo',
      payload: id,
    });
  };

  const handlerDoubleClick = () => {
    setIsEditing(true);
  };

  const handleAddNewTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleEditTitle = () => {
    if (newTitle.trim()) {
      dispatch({
        type: 'editTitle',
        payload: {
          title: newTitle,
          id,
          completed,
        },
      });
      setIsEditing(false);
    } else {
      handleRemoveTodo();
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setNewTitle(title);
      setIsEditing(false);
    }

    if (event.key === 'Enter') {
      handleEditTitle();
    }
  };

  return (
    <li
      className={cn({
        completed: completed === true,
        editing: isEditing,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          onChange={handleChangeCompleted}
          checked={completed}
        />
        <label
          onDoubleClick={handlerDoubleClick}
        >
          {title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={handleRemoveTodo}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={newTitle}
        onChange={handleAddNewTitle}
        onKeyUp={handleKeyUp}
        onBlur={handleEditTitle}
        ref={titleField}
      />
    </li>
  );
};
