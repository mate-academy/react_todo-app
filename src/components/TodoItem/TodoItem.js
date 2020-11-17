import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export function TodoItem({ todo, changeStatus, deleteTodo, updateTodoItem }) {
  const [editingId, setEditingId] = useState('');
  const [newTitle, setNewTitle] = useState(todo.title);

  useEffect(() => {
    setEditingId('');
    setNewTitle(todo.title);
  }, [todo]);

  const updateTodoTitle = (title) => {
    setNewTitle(title);
  };

  const titleChange = (eventKey, todoId) => {
    if (newTitle.length === 0) {
      return;
    }

    if (eventKey === 'Enter') {
      updateTodoItem(todoId, newTitle);
    }

    if (eventKey === 'Escape') {
      setEditingId('');
      setNewTitle(todo.title);
    }
  };

  const onBlurTitleChange = (todoId) => {
    updateTodoItem(todoId, newTitle);
  };

  return (
    <li
      className={classNames({
        completed: todo.completed, editing: editingId === todo.id,
      })}
      onDoubleClick={() => setEditingId(todo.id)}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          value={todo.id}
          onChange={event => changeStatus(event.target.value)}
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
        onKeyDown={event => titleChange(event.key, todo.id)}
        onBlur={() => onBlurTitleChange(todo.id)}
      />
    </li>
  );
}

TodoItem.propTypes = {
  changeStatus: PropTypes.func.isRequired,
  updateTodoItem: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};
