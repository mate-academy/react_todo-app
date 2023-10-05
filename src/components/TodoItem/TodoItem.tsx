/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useRef, useState, useEffect,
} from 'react';

import classNames from 'classnames';

import { Todo } from '../../types/Todo';
import { DispatchContext } from '../TodosContext';

type Props = {
  item: Todo,
};

export const TodoItem: React.FC<Props> = ({ item }) => {
  const dispatch = useContext(DispatchContext);
  const editRef = useRef<HTMLInputElement | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editedTodoTitle, setEditedTodoTitle] = useState(item.title);

  const handleRemoveItem = () => dispatch({
    type: 'remove',
    payload: item.id,
  });

  const handleCompletedClick = () => dispatch({
    type: 'toggle',
    payload: item,
  });

  const saveChanges = () => {
    if (editedTodoTitle.trim().length !== 0) {
      dispatch({
        type: 'edit',
        payload: item,
      });
    } else {
      handleRemoveItem();
    }

    setIsEditing(false);
  };

  useEffect(() => {
    if (isEditing) {
      editRef.current?.focus();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setEditedTodoTitle(item.title);
      setIsEditing(false);
    }

    if (event.key === 'Enter') {
      saveChanges();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTodoTitle(event.target.value);
  };

  return (
    <li
      className={classNames({
        completed: item.completed,
        editing: isEditing,
      })}
    >
      {!isEditing ? (
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id="toggle-view"
            checked={item.completed}
            onClick={handleCompletedClick}
          />

          <label onDoubleClick={handleDoubleClick}>{editedTodoTitle}</label>

          <button
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            onClick={handleRemoveItem}
          />
        </div>
      ) : (
        <input
          ref={editRef}
          type="text"
          className="edit"
          value={editedTodoTitle}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          onBlur={saveChanges}
        />
      )}
    </li>
  );
};
