import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export const TodoItem = ({ todo, deleteTodo, status, updateTitle }) => {
  const [isEditable, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleEditing = (event) => {
    const { key } = event;

    switch (key) {
      case 'Enter':
        if (newTitle) {
          updateTitle(todo.id, newTitle);
        } else {
          setNewTitle(todo.title);
        }

        setEditing(false);
        break;
      case 'Escape':
        setEditing(false);
        setNewTitle(todo.title);
        break;

      default:
        break;
    }
  };

  const handleBlur = () => {
    if (newTitle) {
      updateTitle(todo.id, newTitle);
    } else {
      setNewTitle(todo.title);
    }

    setEditing(false);
  };

  return (
    <li
      key={todo.id}
      className={classNames(
        { completed: todo.completed },
        { editing: isEditable },
      )}
      onDoubleClick={() => setEditing(!isEditable)}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          onClick={() => status(todo.id)}
          checked={todo.completed}
        />
        <label>
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          onClick={() => deleteTodo(todo.id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={newTitle}
        onChange={event => setNewTitle(event.target.value.trim())}
        onKeyUp={handleEditing}
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
  deleteTodo: PropTypes.func.isRequired,
  status: PropTypes.func.isRequired,
  updateTitle: PropTypes.func.isRequired,
};
