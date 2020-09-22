import React, { useState } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames/bind';

export const TodoItem = ({
  todo,
  onToggleToDo,
  removeTodo,
  changeTodo,
}) => {
  const [editTodo, setEditTodo] = useState(false);
  const [todoTitle, setTodoTitle] = useState(todo.title);

  const handleEditing = (event) => {
    if (event.key === 'Enter') {
      if (todoTitle) {
        changeTodo(todo.id, todoTitle.trim());
      } else {
        removeTodo(todo.id);
      }

      setEditTodo(false);
    }

    if (event.key === 'Escape') {
      setTodoTitle(todo.title);
      setEditTodo(false);
    }
  };

  const removefocus = (event) => {
    if (todoTitle) {
      changeTodo(todo.id, todoTitle.trim());
    } else {
      removeTodo(todo.id);
    }

    setEditTodo(false);
  };

  return (
    <li
      className={classNames({
        completed: todo.completed,
        editing: editTodo,
      })}
      onDoubleClick={() => setEditTodo(!editTodo)}
    >
      {!editTodo
        ? (
          <div className="view">
            <input
              type="checkbox"
              className="toggle"
              checked={todo.completed}
              onChange={event => onToggleToDo(event, todo.id)}
            />
            <label>
              {todo.title}
            </label>
            <button
              type="button"
              className="destroy"
              onClick={() => removeTodo(todo.id)}
            />
          </div>
        )
        : (
          <input
            type="text"
            className="edit"
            value={todoTitle}
            autoFocus
            onChange={event => setTodoTitle(event.target.value)}
            onKeyUp={handleEditing}
            onBlur={removefocus}
          />
        )
      }
    </li>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.isRequired,
    completed: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  onToggleToDo: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
  changeTodo: PropTypes.func.isRequired,
};
