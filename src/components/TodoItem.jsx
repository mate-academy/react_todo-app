import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const TodoItem = ({
  title,
  id,
  completed,
  changeTodo,
  deleteTodo,
}) => {
  const [newTitle, setNewTitle] = useState('');
  const [editTitle, setEditTitle] = useState(false);

  const edit = (event) => {
    if (event.key === 'Enter' && newTitle) {
      changeTodo(id, newTitle);
      setEditTitle(false);
      setNewTitle('');
    }

    if (event.key === 'Enter' && !newTitle) {
      deleteTodo(id)
    }

    if (event.key === 'Escape') {
      setNewTitle('');
      setEditTitle(false);
    }
  };

  const saveChanges = (event) => {
    if (newTitle) {
      changeTodo(id, newTitle);
      setEditTitle(false);
      setNewTitle('');
    } else {
      setEditTitle(false);
      setNewTitle('');
    }
  };

  return (
    <li
      className={classNames({
        completed,
        editing: editTitle,
      })}
      onDoubleClick={() => {
        setEditTitle(!editTitle);
      }}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={completed}
          onChange={() => changeTodo(id)}
        />
        <label>{title}</label>
        <button
          type="button"
          className="destroy"
          onClick={() => deleteTodo(id)}
        />
      </div>
      {editTitle && (
        <input
          autoFocus
          type="text"
          className="edit"
          defaultValue={title}
          onChange={event => setNewTitle(event.target.value.trim())}
          onKeyDown={edit}
          onBlur={saveChanges}
        />
      )}
    </li>
  );
};

TodoItem.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  completed: PropTypes.bool.isRequired,
  changeTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};
