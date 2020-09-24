import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const TodoItem = ({
  todo,
  toggleStatus,
  deleteTodo,
  editTitle,
}) => {
  const [editing, setEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleChange = (event) => {
    setNewTitle(event.target.value.trim());
  };

  const handleEdit = (event) => {
    if (event.key === 'Enter') {
      editTitle(todo.id, newTitle);

      if (!newTitle) {
        deleteTodo(todo.id);
      }

      setEdit(false);
    }

    if (event.key === 'Escape') {
      setNewTitle(todo.title);
      setEdit(false);
    }
  };

  const handleSaveChanges = () => {
    editTitle(todo.id, newTitle);

    if (!newTitle) {
      deleteTodo(todo.id);
    }

    setEdit(false);
  };

  return (
    <li
      key={todo.id}
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
          onChange={() => toggleStatus(todo.id)}
        />
        <label onDoubleClick={() => setEdit(true)}>
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
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  toggleStatus: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  editTitle: PropTypes.func.isRequired,
};
