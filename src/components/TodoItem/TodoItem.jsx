import React, { useState } from 'react';
import className from 'classnames';
import PropTypes from 'prop-types';

export const TodoItem = ({
  saveTodos,
  setStatus,
  changeTitle,
  removeTodo,
}) => {
  const [newTitle, setNewTitle] = useState();
  const [editTitle, setEditTitle] = useState(false);
  const [todoId, setTodoId] = useState(0);

  const handleEdit = ({ target }) => {
    if (target.value) {
      setNewTitle(target.value);
    }
  };

  const handleDblClick = (event, title, id) => {
    event.preventDefault();
    setEditTitle(!editTitle);
    setNewTitle(title);
    setTodoId(id);
  };

  const handleKeyUp = (event) => {
    const { key } = event;

    switch (key) {
      case 'Enter':
        setEditTitle(false);
        changeTitle(newTitle, todoId);
        break;

      case 'Escape':
        setEditTitle(false);
        changeTitle(newTitle, todoId);
        break;

      default:
        break;
    }
  };

  const handleBlur = () => {
    setEditTitle(false);
    changeTitle(newTitle, todoId);
  };

  return (
    <>
      {saveTodos.map(todo => (
        <li
          key={todo.id}
          className={className({
            completed: todo.completed,
            editing: editTitle,
          })}
          onDoubleClick={event => handleDblClick(event, todo.title, todo.id)}
        >
          <div className="view">
            <input
              type="checkbox"
              className="toggle"
              checked={todo.completed}
              onChange={() => setStatus(todo.id)}
            />
            <label>
              {todo.title}
            </label>
            <button
              type="button"
              className="destroy"
              onClick={() => {
                removeTodo(todo.id);
              }}
            />
          </div>
          <input
            type="text"
            className="edit"
            value={newTitle}
            onChange={handleEdit}
            onKeyUp={handleKeyUp}
            onBlur={handleBlur}
          />
        </li>
      ))}
    </>

  );
};

TodoItem.propTypes = {
  saveTodos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
  setStatus: PropTypes.func.isRequired,
  changeTitle: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
};
