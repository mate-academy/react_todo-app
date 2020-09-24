import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const TodoItem = (
  { todo,
    deleteTodo,
    todoStatusToggle,
    editTodoTitle },
) => {
  const [editedTitle, setEditedTitle] = useState('');
  const [editing, setEditing] = useState(false);

  const handleEditTitle = () => {
    if (editedTitle) {
      editTodoTitle(todo.id, editedTitle);
      setEditing(false);
    } else {
      deleteTodo(todo.id);
    }
  };

  const handleSubmit = (event) => {
    if (event.key === 'Enter') {
      handleEditTitle();
    }

    if (event.key === 'Escape') {
      setEditing(false);
    }
  };

  const outFocused = () => {
    handleEditTitle();
    if (!editedTitle) {
      deleteTodo(todo.id);
    }

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
          onChange={() => todoStatusToggle(todo.id)}
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
          onChange={event => setEditedTitle(event.target.value.trimLeft())}
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
  editTodoTitle: PropTypes.func.isRequired,
  todoStatusToggle: PropTypes.func.isRequired,
};
