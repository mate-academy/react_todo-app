import React, { useState } from 'react';
import className from 'classnames';
import PropTypes from 'prop-types';

export const TodoItem = ({ todo, setStatus, destroyTodo, setTitleEditing }) => {
  const [newTitle, setNewTitle] = useState('');
  const [editTitle, setEditTitle] = useState(false);

  const handleDblClick = (event, title) => {
    event.preventDefault();
    setEditTitle(!editTitle);
    setNewTitle(title);
  };

  const handleKeyUp = (event) => {
    const { key } = event;

    switch (key) {
      case 'Enter':
        setTitleEditing(todo.id, newTitle);
        setEditTitle(false);
        break;

      case 'Escape':
        setNewTitle(todo.title);
        setTitleEditing(todo.id, todo.title);
        setEditTitle(false);
        break;

      default:
        break;
    }
  };

  const handleEdit = ({ target }) => {
    if (target.value) {
      setNewTitle(target.value);
    }
  };

  const handleBlur = (todoId, title) => {
    setTitleEditing(todoId, title);
    setEditTitle(false);
  };

  return (
    <li
      key={todo.id}
      className={className({
        completed: todo.completed,
        editing: editTitle,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onChange={() => setStatus(todo.id)}
        />
        <label
          onDoubleClick={event => handleDblClick(event, todo.title)}
        >
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          onClick={() => destroyTodo(todo.id)}
        />
      </div>
      {editTitle &&
        <input
          autoFocus
          type="text"
          className="edit"
          value={newTitle}
          onChange={handleEdit}
          onKeyUp={handleKeyUp}
          onBlur={handleBlur}
        />
      }
    </li>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  setStatus: PropTypes.func.isRequired,
  destroyTodo: PropTypes.func.isRequired,
  setTitleEditing: PropTypes.func.isRequired,
};
