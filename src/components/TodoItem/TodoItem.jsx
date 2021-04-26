import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './TodoItem.scss';

export const TodoItem = ({
  todo,
  onDelete,
  onChange,
  handleEditChanges,
}) => {
  const [checked, setChecked] = useState(todo.completed);
  const [title, setTitle] = useState(todo.title);

  useEffect(() => {
    setChecked(todo.completed);
  }, [todo]);

  const handleDoubleClick = (clickEvent) => {
    const li = clickEvent.currentTarget.closest('div').closest('li');
    const input = li.querySelector('.edit');

    li.classList.add('editing');
    input.focus();
  };

  const handleKeyPress = (keyEvent) => {
    const li = keyEvent.currentTarget.closest('li');

    if (keyEvent.key === 'Escape' || keyEvent.key === 'Esc') {
      li.classList.remove('editing');
      setTitle(todo.title);
    }

    if (keyEvent.key === 'Enter') {
      setTitle(title);
      handleEditChanges(todo.id, title);
      li.classList.remove('editing');
    }
  };

  const handleChange = (changeEvent) => {
    setTitle(changeEvent.target.value);
  };

  return (

    <li id="todo">
      <div className="view">
        <input
          checked={todo.completed}
          type="checkbox"
          className="toggle"
          onChange={() => {
            setChecked(!checked);

            return onChange(todo.id);
          }}
        />
        <label
          className={
            todo.completed
              ? 'completed'
              : ''
          }
          onDoubleClick={handleDoubleClick}
        >
          {title}
        </label>
        <button
          type="button"
          className="destroy"
          onClick={() => onDelete(todo.id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        onKeyDown={handleKeyPress}
        onChange={handleChange}
        value={title}
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
  onDelete: PropTypes.func.isRequired,
  handleEditChanges: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};
