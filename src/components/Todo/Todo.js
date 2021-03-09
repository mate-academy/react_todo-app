import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { EDIT_TODO, DELETE_TODO, COMPLETE_TODO } from '../../constants';

export const Todo = ({ todo, handleTodo }) => {
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
    handleTodo(EDIT_TODO, id, tempTitle, null);
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
              handleTodo(COMPLETE_TODO, todo.id, null, !todo.completed)
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
            onClick={() => handleTodo(DELETE_TODO, todo.id, null, null)}
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
  handleTodo: PropTypes.func.isRequired,
};

Todo.defaultProps = {
  todo: {},
};
