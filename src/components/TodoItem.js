import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const TodoItem = ({ todo, onToggle, onDelete, onSubmit }) => {
  const { title, id, completed } = todo;
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(title);

  const handleChange = (ev) => {
    setValue(ev.target.value.trim());
  };

  const handleEditing = (ev) => {
    switch (ev.key) {
      case 'Enter':
        if (value.length === 0) {
          return;
        }

        // const changedTodo = { ...todo, title: value };

        onSubmit({ ...todo, title: value });
        setIsEditing(false);
        break;

      case 'Escape':
        setIsEditing(false);
        setValue(title);
        break;

      default:
        setValue(ev.target.value.trim());
        break;
    }
  };

  const handleBlur = () => {
    const changedTodo = { ...todo, title: value };

    onSubmit(changedTodo);
    setIsEditing(false);
  };

  return (
    <li
      key={id}
      className={classNames({
        completed,
        editing: isEditing,
      })}
    >

      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={!!completed}
          onChange={() => onToggle(id)}
        />

        <label onDoubleClick={() => setIsEditing(true)}>
          {title}
        </label>

        <button
          type="button"
          className="destroy"
          onClick={() => onDelete(title)}
        />
      </div>

      <input
        className="edit"
        type="text"
        value={value}
        onChange={handleChange}
        onKeyUp={handleEditing}
        onBlur={handleBlur}
      />
    </li>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.number,
    completed: PropTypes.bool,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
