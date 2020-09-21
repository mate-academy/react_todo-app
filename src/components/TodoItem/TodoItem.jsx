import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const TodoItem = ({
  todo, handleDelete, changeCompleted, changeTitle,
}) => {
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const handleChange = (event) => {
    setNewTitle(event.target.value.trimLeft());
  };

  const handleEdit = (event) => {
    if (event.key === 'Enter' && newTitle) {
      changeTitle(todo.id, newTitle);
      setEditing(false);
      setNewTitle('');
    } else if (event.key === 'Enter' && !newTitle) {
      handleDelete(todo.id);
    }

    if (event.key === 'Escape') {
      setNewTitle('');
      setEditing(false);
    }
  };

  const handleSaveChanges = () => {
    if (newTitle) {
      changeTitle(todo.id, newTitle);
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
        completed: todo.completed,
        editing,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onChange={() => changeCompleted(todo.id)}
        />
        <label
          onDoubleClick={() => setEditing(true)}
        >
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          onClick={() => handleDelete(todo.id)}
        />
      </div>
      {editing && (
        <input
          autoFocus
          type="text"
          className="edit"
          defaultValue={todo.title}
          onChange={handleChange}
          onKeyDown={handleEdit}
          onBlur={handleSaveChanges}
        />
      )}
    </li>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  changeTitle: PropTypes.func.isRequired,
  changeCompleted: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
