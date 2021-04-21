import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const TodoItem = ({
  todo,
  deleteTodo,
  toggleTodoComplete,
  editTodoTitle,
}) => {
  const [isEditing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const allowEditTodo = () => {
    setEditing(true);
  };

  const editTitle = (event) => {
    const { value } = event.target;

    setNewTitle(value);
  };

  const handleKeyAction = (event) => {
    if (event.key === 'Enter') {
      editTodoTitle(todo, newTitle);
      setEditing(false);
    }

    if (event.key === 'Escape') {
      setNewTitle(todo.title);
      setEditing(false);
    }
  };

  const handleToggleComplete = () => {
    toggleTodoComplete(todo);
  };

  return (
    <li
      className={`${todo.completed ? 'completed' : ''}
      ${isEditing ? 'editing' : ''}`}
      onDoubleClick={allowEditTodo}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onChange={handleToggleComplete}
          editable={isEditing}
        />
        <label>{todo.title}</label>
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
        onChange={editTitle}
        onKeyDown={handleKeyAction}
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
  toggleTodoComplete: PropTypes.func.isRequired,
  editTodoTitle: PropTypes.func.isRequired,
};
