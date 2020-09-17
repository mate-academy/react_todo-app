import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const TodoItem = ({ todo, checkTodo, removeTodo, updateTitle }) => {
  const [isEditable, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const handleEditing = () => {
    setEditing(!isEditable);
  };

  const handleKeyDown = (event) => {
    const { key } = event;

    if (!title || key === 'Escape') {
      setEditing(false);

      return;
    }

    if (key === 'Enter') {
      updateTitle(todo.id, title);
      setEditing(false);
    }
  };

  return (
    <li
      className={classNames(
        { completed: todo.completed },
        { editing: isEditable },
      )}
      onDoubleClick={handleEditing}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onChange={() => checkTodo(todo.id)}
        />
        <label>{todo.title}</label>
        <button
          type="button"
          className="destroy"
          onClick={() => removeTodo(todo.id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={title}
        onChange={event => setTitle(event.target.value)}
        onKeyDown={handleKeyDown}
      />
    </li>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  checkTodo: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
  updateTitle: PropTypes.func.isRequired,
};
