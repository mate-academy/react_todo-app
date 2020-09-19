import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

export const Todo = ({ item, handleStatus, setTodos }) => {
  const [editingTodo, setEditingTodo] = useState(false);
  const [editedTitle, setEditedTitle] = useState(item.title);

  const destroyTodo = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const handleChanges = (newTitle) => {
    if (!newTitle) {
      destroyTodo(item.id)
    }

    setTodos(prevTodos => {
      return prevTodos.map(todo => {
        if (todo.id === item.id) {
          return {
            ...todo,
            title: newTitle,
          }
        }
        return todo;
      })
    })
    setEditingTodo(false)
  }

  const handleKeyDown = (event) => {
    const {value} = event.target;
    const {key} = event;

    if (key === 'Escape') {
      setEditedTitle(item.title);
      setEditingTodo(false);
      return;
    } else if (key === 'Enter') {
      handleChanges(value);
      setEditingTodo(false);
    }
  }

  return (
    <li
      className={cn({ 'completed': item.completed, 'editing': editingTodo })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={item.completed}
          onChange={() => handleStatus(item.id)}
        />
        <label
          onDoubleClick={() => setEditingTodo(true)}
        >
          {item.title}
        </label>
        <button
          type="button"
          className="destroy"
          onClick={() => destroyTodo(item.id)}
        />
      </div>
      {editingTodo && (
        <input
          autoFocus
          value={editedTitle}
          type="text"
          className="edit"
          onChange={event => setEditedTitle(event.target.value)}
          onKeyDown={event => handleKeyDown(event)}
          onBlur={event => handleChanges(event.target.value)}
        />
      )}
    </li>
  );
};

Todo.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  handleStatus: PropTypes.func.isRequired,
  setTodos: PropTypes.func.isRequired,
};
