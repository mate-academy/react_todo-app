import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

export const Todo = ({ item, handleStatus, setTodos }) => {
  const [editingTodo, setEditingTodo] = useState(false);
  const [editedTitle, setEditedTitle] = useState(item.title);

  const destroyTodo = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const handleChanges = (event) => {
    const [value, key] = event.target;
    console.log(event);

    if (key === 'Escape') {
      setEditingTodo(false);
      return;
    } else if (event.key === 'Enter') {
      setTodos(prevTodos => {
      return prevTodos.map(todo => {
        if (todo.id === item.id) {
          return {
            ...todo,
            title: value
          }
        }
        return todo;
      })
    })
    }

    setEditingTodo(false)
    
  }

  return (
    <li
      
      className={cn({ 'completed': item.completed, 'editing': editingTodo })}>
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
      <input
        // onFocus={editingTodo}
        value={editedTitle}
        type="text"
        className="edit"
        onChange={event => setEditedTitle(event)}
        onKeyDown={event => handleChanges(event)}
        onBlur={event => handleChanges(event)}
      />
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
