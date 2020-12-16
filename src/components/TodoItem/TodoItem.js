import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export function TodoItem({
  todo,
  changeStatus,
  deleteTodo,
  updateTodoItem,
  editingTodoId,
  setEditingTodoId,
}) {
  const [newTitle, setNewTitle] = useState(todo.title);

  useEffect(() => {
    setNewTitle(todo.title);
  }, []);

  const updateTodoTitle = (title) => {
    setNewTitle(title);
  };

  const handleKeyDown = (eventKey, todoId) => {
    if (newTitle.trim().length === 0) {
      return;
    }

    switch (eventKey) {
      case 'Enter':
        setEditingTodoId(0);
        updateTodoItem(todoId, newTitle);
        break;
      case 'Escape':
        setEditingTodoId(0);
        setNewTitle(todo.title);
        break;
      default:
        break;
    }
  };

  const handleChange = (event) => {
    changeStatus(event.target.value);
  };

  const handleBlur = (todoId) => {
    setEditingTodoId(0);
    updateTodoItem(todoId, newTitle);
  };

  return (
    <li
      className={classNames({
        completed: todo.completed,
        editing: editingTodoId === todo.id,
      })}
      onDoubleClick={() => setEditingTodoId(todo.id)}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          value={todo.id}
          onChange={event => handleChange(event)}
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
        onChange={event => updateTodoTitle(event.target.value)}
        onKeyDown={event => handleKeyDown(event.key, todo.id)}
        onBlur={() => handleBlur(todo.id)}
      />
    </li>
  );
}

TodoItem.propTypes = {
  editingTodoId: PropTypes.number.isRequired,
  setEditingTodoId: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired,
  updateTodoItem: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};
