import React, { useState } from 'react';
import ClassNames from 'classnames';
import PropTypes from 'prop-types';

export const TodoItem = ({
  todo,
  handleDelete,
  changeTodoTitle,
  todosToggler,
}) => {
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const handleChange = (event) => {
    setNewTitle(event.target.value.trimStart());
  };

  const handleEdit = (event) => {
    if (event.key === 'Enter' && newTitle) {
      changeTodoTitle(todo.id, newTitle);
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
      changeTodoTitle(todo.id, newTitle);
      setEditing(false);
      setNewTitle('');
    } else {
      setEditing(false);
      setNewTitle('');
    }
  };

  return (
    <li
      key={todo.id}
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
          onChange={() => todosToggler(todo.id)}
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
  handleDelete: PropTypes.func.isRequired,
  changeTodoTitle: PropTypes.func.isRequired,
  todosToggler: PropTypes.func.isRequired,
};
