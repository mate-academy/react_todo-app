/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodoContext } from '../../context/TodoContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { title, completed, id } = todo;
  const { dispatch } = useContext(TodoContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const trimmedTitle = editedTitle.trim();

  const deleteTodo = () => dispatch({ type: 'deleteTodo', payload: id });
  const toggleTodo = () => dispatch({ type: 'toggleTodo', payload: id });
  const updateTodoTitle = () => dispatch({
    type: 'updateTodoTitle', payloadId: id, payloadTitle: trimmedTitle,
  });

  const handleEditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(event.target.value);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleEditSubmit = () => {
    // const trimmedTitle = editedTitle.trim();

    if (trimmedTitle !== '') {
      setEditedTitle(trimmedTitle);
      setIsEditing(false);
      updateTodoTitle();
    } else {
      deleteTodo();
    }
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditedTitle(title);
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleEditSubmit();
    } else if (event.key === 'Escape') {
      handleEditCancel();
    }
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <li
      className={classNames({
        completed,
        editing: isEditing,
      })}
    >
      {!isEditing ? (
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id="toggle-view"
            checked={completed}
            onClick={toggleTodo}
          />
          <label onDoubleClick={handleEdit}>{title}</label>
          <button
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            onClick={deleteTodo}
          />
        </div>
      ) : (
        <input
          type="text"
          ref={inputRef}
          className="edit"
          value={editedTitle}
          placeholder="Empty todo will be deleted"
          onChange={handleEditChange}
          onBlur={handleEditSubmit}
          onKeyUp={handleKeyUp}
        />
      )}
    </li>
  );
};
