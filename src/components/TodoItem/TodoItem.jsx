import React, { useState } from 'react';
import '../../styles/todo-list.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const TodoItem = ({ item, setTodos }) => {
  const [editItem, setEditItem] = useState(false);
  const [editedTodos, setEditedTodos] = useState(item.title);

  const deleteTodo = (id) => {
    setTodos(todos => todos.filter(todo => todo.id !== id));
  };

  const handleChangeTitle = (title) => {
    if (!title) {
      deleteTodo(item.id);
    }

    setTodos(todos => todos.map((todo) => {
      if (todo.id === item.id) {
        return {
          ...todo,
          title,
        };
      }

      return todo;
    }));
    setEditItem(false);
    setEditedTodos(title.trim());
  };

  const handleStatusTodo = (id) => {
    setTodos(todos => todos
      .map((todo) => {
        if (todo.id !== id) {
          return { ...todo };
        }

        return {
          ...todo,
          completed: !todo.completed,
        };
      }));
  };

  const handleKeyboard = ({ key, target }) => {
    switch (key) {
      case 'Enter':
        handleChangeTitle(target.value);
        setEditedTodos(target.value.trim());
        setEditItem(false);
        break;

      case 'Escape':
        setEditedTodos(item.title);
        setEditItem(false);
        break;

      default:
    }
  };

  return (
    <li
      className={classNames(
        { completed: item.completed, editing: editItem },
      )}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={item.completed}
          onChange={() => handleStatusTodo(item.id)}
        />
        <label
          onDoubleClick={() => setEditItem(true)}
        >
          {item.title}
        </label>
        <button
          type="button"
          className="destroy"
          onClick={() => deleteTodo(item.id)}
        />
      </div>
      {editItem && (
        <input
          value={editedTodos}
          type="text"
          className="edit"
          onChange={e => setEditedTodos(e.target.value)}
          onKeyDown={e => handleKeyboard(e)}
          onBlur={e => handleChangeTitle(e.target.value)}
        />
      )}
    </li>
  );
};

TodoItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  setTodos: PropTypes.func.isRequired,
};
