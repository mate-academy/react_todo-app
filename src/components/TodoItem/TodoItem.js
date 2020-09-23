import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

export const TodoItem = ({
  todo,
  deleteTodo,
  changeCompleteness,
  changeTodoTitle,
}) => {
  const [isEditingNow, setEditing] = useState(false);
  const [choosenTodoId, setChoosenTodoId] = useState(null);
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleKeysPressing = (event) => {
    switch (event.key) {
      case 'Escape':
        setNewTitle(todo.title);
        setEditing(!isEditingNow);
        break;
      case 'Enter':
        if (newTitle.trim()) {
          changeTodoTitle(choosenTodoId, newTitle.trim());
          setEditing(!isEditingNow);
          break;
        }

        break;
      default:
    }
  };

  return (
    <li
      className={cn({
        completed: todo.completed,
        editing: choosenTodoId === todo.id && isEditingNow,
      })}
      onDoubleClick={() => {
        setEditing(true);
        setChoosenTodoId(todo.id);
      }}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onChange={() => {
            changeCompleteness(todo.id);
          }}
        />

        <label>{todo.title}</label>

        <button
          type="button"
          className="destroy"
          onClick={() => deleteTodo(todo.id)}
        />
      </div>

      {isEditingNow && (
        <input
          type="text"
          className="edit"
          autoFocus
          onBlur={() => setEditing(!isEditingNow)}
          value={newTitle}
          onChange={event => setNewTitle(event.target.value)}
          onKeyDown={event => handleKeysPressing(event)}
        />
      )}
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
  changeCompleteness: PropTypes.func.isRequired,
  changeTodoTitle: PropTypes.func.isRequired,
};
