import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const Todo = ({
  title,
  id,
  onCompletedChange,
  completed,
  onTodoDeletion,
  onTodoChange,
}) => {
  const [editing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const handleTodoEditing = (event) => {
    switch (event.key) {
      case 'Enter':
        onTodoChange(id, editedTitle);

        if (!editedTitle) {
          onTodoDeletion(id);
        }

        setEditing(false);
        break;
      case 'Escape':
        setEditedTitle(title);
        setEditing(false);
        break;
      default:
        break;
    }
  };

  return (
    <li
      className={classNames({
        completed,
        editing,
      })}
    >
      <div className="view">
        <input
          checked={completed}
          type="checkbox"
          className="toggle"
          onChange={() => onCompletedChange(id)}
        />
        <label onDoubleClick={() => setEditing(true)}>
          {title}
        </label>
        <button
          type="button"
          className="destroy"
          onClick={() => {
            onTodoDeletion(id);
          }}
        />
      </div>

      {editing && (
        <input
          autoFocus={editing}
          type="text"
          className="edit"
          value={editedTitle}
          onKeyDown={e => handleTodoEditing(e)}
          onFocus={e => e.currentTarget.select()}
          onChange={e => setEditedTitle(e.target.value.trimLeft())}
          onBlur={() => {
            onTodoChange(id, editedTitle);

            if (!editedTitle) {
              onTodoDeletion(id);
            }

            setEditing(false);
          }}
        />
      )}
    </li>
  );
};

Todo.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  onCompletedChange: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  onTodoDeletion: PropTypes.func.isRequired,
  onTodoChange: PropTypes.func.isRequired,
};
