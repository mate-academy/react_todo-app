import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { filtersNames } from '../../js/filtersNames';

export function TodoItem({
  todo,
  changeStatus,
  deleteTodo,
  updateTodoItem,
  filterStatus,
  allCompleted,
}) {
  const [editingMode, setEditingMode] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const [completed, setCompleted] = useState(todo.completed);

  useEffect(() => {
    setCompleted(allCompleted);
  }, [allCompleted]);

  useEffect(() => {
    setEditingMode(false);
    setNewTitle(todo.title);
  }, []);

  const updateTodoTitle = (title) => {
    setNewTitle(title);
  };

  const handleKeyDown = (eventKey, todoId) => {
    if (newTitle.length === 0) {
      return;
    }

    switch (eventKey) {
      case 'Enter':
        updateTodoItem(todoId, newTitle);
        break;
      case 'Escape':
        setEditingMode(false);
        setNewTitle(todo.title);
        break;
      default:
    }
  };

  const setItemHidden = () => {
    switch (filterStatus) {
      case filtersNames.active:
        return completed;
      case filtersNames.completed:
        return !completed;
      default:
        return false;
    }
  };

  const handleChange = (event) => {
    changeStatus(event.target.value);
    setCompleted(!completed);
  };

  const handleBlur = (todoId) => {
    updateTodoItem(todoId, newTitle);
  };

  return (
    <li
      className={classNames({
        completed: todo.completed,
        editing: editingMode === true,
      })}
      onDoubleClick={() => setEditingMode(true)}
      hidden={setItemHidden()}
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
  allCompleted: PropTypes.bool.isRequired,
  filterStatus: PropTypes.string.isRequired,
  changeStatus: PropTypes.func.isRequired,
  updateTodoItem: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};
