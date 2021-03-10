import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

export const Todo = ({ todo, completeTodo, editTodo, deleteTodo }) => {
  const [tempTitle, setTempTitle] = useState('');
  const [isTodoEditing, setisTodoEditing] = useState(false);

  const handleDoubleClick = (event, title) => {
    event.preventDefault();
    setisTodoEditing(!isTodoEditing);
    setTempTitle(title);
  };

  const handleEditing = ({ target }) => {
    setTempTitle(target.value);
  };

  const handleBlur = (id) => {
    editTodo(id, tempTitle);
    setisTodoEditing(false);
  };

  const handleKeyDown = (event, todoId) => {
    switch (event.key) {
      case 'Enter':
        handleBlur(todoId);
        break;
      case 'Escape':
        setisTodoEditing(false);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <li
        key={todo.id}
        className={cn({
          completed: todo.completed,
          editing: isTodoEditing,
        })}
      >
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            checked={todo.completed}
            onChange={() => (
              completeTodo(todo.id, !todo.completed)
            )}
          />
          <label onDoubleClick={(event) => {
            handleDoubleClick(event, todo.title);
          }}
          >
            {todo.title}
          </label>
          <button
            type="button"
            className="destroy"
            onClick={() => deleteTodo(todo.id)}
          />
        </div>
        {isTodoEditing
            && (
            <input
              autoFocus
              type="text"
              className="edit"
              value={tempTitle}
              onChange={handleEditing}
              onBlur={() => handleBlur(todo.id)}
              onKeyDown={event => handleKeyDown(event, todo.id)}
            />
            )}
      </li>
    </>
  );
};

Todo.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }),
  // handleTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  completeTodo: PropTypes.func.isRequired,
};

Todo.defaultProps = {
  todo: {},
};
