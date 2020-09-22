import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export const TodoItem = ({
  id,
  title,
  completed,
  changeStatus,
  deleteTodo,
  changeTitle,
}) => {
  const [newTitle, setNewTitle] = useState(title);
  const [editing, setEditing] = useState(false);

  return (
    <li
      className={classNames({
        view: !completed,
        completed,
        editing,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          checked={completed}
          className="toggle"
          onChange={() => {
            changeStatus(id);
          }}
        />
        <label
          onDoubleClick={() => {
            setEditing(true);
          }}
        >
          {title}
        </label>
        <button
          type="button"
          className="destroy"
          onClick={() => {
            deleteTodo(id);
          }}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={newTitle}
        onChange={(event) => {
          setNewTitle(event.target.value);
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && newTitle.trim()) {
            changeTitle(id, newTitle);

            setNewTitle('');
            setEditing(false);
          }

          if (event.key === 'Enter' && newTitle.trim() === '') {
            deleteTodo(id);
          }

          if (event.key === 'Escape') {
            setNewTitle('');
            setEditing(false);
          }
        }}
      />
    </li>
  );
};

TodoItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  changeStatus: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  changeTitle: PropTypes.func.isRequired,
};
