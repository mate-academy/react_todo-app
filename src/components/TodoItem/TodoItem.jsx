import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const TodoItem = ({
  id, title, completed, handleDelete, changeCompleted, changeTitle,
}) => {
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const handleChange = (event) => {
    setNewTitle(event.target.value.trimLeft());
  };

  const handleEdit = (event) => {
    if (event.key === 'Enter' && newTitle) {
      changeTitle(id, newTitle);
      setEditing(false);
      setNewTitle('');
    }

    if (event.key === 'Escape') {
      setNewTitle('');
      setEditing(false);
    }
  };

  const handleSaveChanges = () => {
    if (newTitle) {
      changeTitle(id, newTitle);
      setEditing(false);
      setNewTitle('');
    } else {
      setEditing(false);
      setNewTitle('');
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
          type="checkbox"
          className="toggle"
          checked={completed}
          onChange={() => changeCompleted(id)}
        />
        <label
          onDoubleClick={() => setEditing(true)}
        >
          {title}
        </label>
        <button
          type="button"
          className="destroy"
          onClick={() => handleDelete(id)}
        />
      </div>
      {(editing === true) && (
        <input
          autoFocus
          type="text"
          className="edit"
          defaultValue={title}
          onChange={handleChange}
          onKeyDown={handleEdit}
          onBlur={handleSaveChanges}
        />
      )}
    </li>
  );
};

TodoItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  changeTitle: PropTypes.func.isRequired,
  changeCompleted: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
