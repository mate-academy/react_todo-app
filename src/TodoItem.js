import React, { useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export const TodoItem = ({ todo, onStatusChange, deleteTodo, updateTitle }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const keyDownHandler = (event) => {
    const { key } = event;

    switch (key) {
      case 'Enter':
        updateTitle(todo.id, newTitle);
        setIsEditable(false);
        break;

      case 'Escape':
        setNewTitle(todo.title);
        updateTitle(todo.id, todo.title);
        setIsEditable(false);
        break;

      default:
        break;
    }
  };

  const handleBlur = (todoTitle, todoId) => {
    updateTitle(todoTitle, todoId);

    setIsEditable(false);
  };

  return (
    <li
      className={classnames(
        { completed: todo.completed },
        { editing: isEditable },
      )}
      onDoubleClick={() => setIsEditable(todo.id)}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          onChange={() => onStatusChange(todo.id)}
          checked={todo.completed}
        />
        <label>{todo.title}</label>
        <button
          type="button"
          className="destroy"
          onChange={() => deleteTodo(todo.id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={newTitle}
        onChange={event => setNewTitle(event.target.value.trim())}
        onKeyUp={keyDownHandler}
        onBlur={handleBlur}
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
  onStatusChange: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  updateTitle: PropTypes.func.isRequired,
};
