import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

export function TodoItem({ todo, completedToggle, deleteTodo, changeTodo }) {
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleChange = (event) => {
    setNewTitle(event.target.value.trim());
  };

  const handleEdit = (event) => {
    if (event.key === 'Enter') {
      changeTodo(todo.id, newTitle);

      if (!newTitle) {
        deleteTodo(todo.id);
      }

      setEditing(false);
    }

    if (event.key === 'Escape') {
      setNewTitle(todo.title);
      setEditing(false);
    }
  };

  const handleSaveChanges = () => {
    changeTodo(todo.id, newTitle);

    if (!newTitle) {
      deleteTodo(todo.id);
    }

    setEditing(false);
  };

  return (
    <li
      className={ClassNames({
        completed: todo.completed,
        editing,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onChange={() => completedToggle(todo.id)}
        />
        <label
          onDoubleClick={() => setEditing(true)}
        >
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          onClick={() => deleteTodo(todo.id)}
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
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  completedToggle: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  changeTodo: PropTypes.func.isRequired,
};
