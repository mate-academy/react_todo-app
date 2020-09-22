import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const TodoItem = (
  { todo,
    deleteTodo,
    editTodo },
) => {
  const [editedTitle, setEditedTitle] = useState('');
  const [editing, setEditing] = useState(false);

  const editNonEmptyTitle = () => {
    if (editedTitle) {
      editTodo(todo.id, editedTitle);
      setEditing(false);
    }
  };

  const handleSubmit = (event) => {
    if (event.key === 'Enter') {
      editNonEmptyTitle();
    }

    if (event.key === 'Escape') {
      setEditing(false);
    }
  };

  const outFocused = () => {
    editNonEmptyTitle();
    setEditing(false);
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
          onChange={() => editTodo(todo.id, !todo.completed)}
          checked={todo.completed}
        />
        <label onDoubleClick={() => setEditing(true)}>
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
          onKeyDown={handleSubmit}
          onChange={event => setEditedTitle(event.target.value)}
          onBlur={outFocused}
        />
      )}
    </li>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({ id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired }).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
};
