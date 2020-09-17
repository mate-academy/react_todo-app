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

  return (
    <li
      className={classNames({
        completed,
        editing,
      })}
      onDoubleClick={() => setEditing(true)}
    >
      <div className="view">
        <input
          checked={completed}
          type="checkbox"
          className="toggle"
          onChange={() => {
            onCompletedChange(id);
          }}
        />
        <label>
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

      <input
        type="text"
        className="edit"
        value={editedTitle}
        onChange={e => setEditedTitle(e.target.value.trimLeft())}
        onBlur={() => {
          onTodoChange(id, editedTitle);
          setEditing(false);
        }}
      />
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
