import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export const TodoItem = ({ todo, complete, onDelete, todoWasEdited }) => {
  const [currentTodo, setCurrentTodo] = useState(todo.title);
  const [newTodo, setEditigTodo] = useState(currentTodo);
  const [editing, setEditing] = useState(false);

  return (
    <li className={classNames({
      completed: todo.completed,
      editing,
    })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onChange={() => {
            complete(todo.id);
          }}
        />
        <label onDoubleClick={() => setEditing(true)}>
          {currentTodo}
        </label>
        <button
          type="button"
          className="destroy"
          onClick={() => {
            onDelete(todo.id);
          }}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={newTodo}
        onBlur={() => setEditing(false)}
        onChange={({ target }) => {
          setEditigTodo(target.value);
        }}
        onKeyDown={(event) => {
          switch (event.key) {
            case 'Enter':
              if (newTodo) {
                todoWasEdited(todo.id, newTodo);
                setCurrentTodo(newTodo);
                setEditing(false);

                return;
              }

              setEditigTodo(currentTodo);
              setEditing(false);

              return;

            case 'Escape':
              setEditing(false);
              break;

            default:
          }
        }}
      />
    </li>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    completed: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  complete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  todoWasEdited: PropTypes.func.isRequired,
};
