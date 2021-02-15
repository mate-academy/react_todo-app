import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const TodoItem = ({ todo, onToggle, onDelete, onSubmit }) => {
  const { title, id, completed } = todo;
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(title);

  const handleChange = (ev) => {
    setValue(ev.target.value);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    if (value.length === 0) {
      return;
    }

    const changedTodo = { ...todo, title: value };

    onSubmit(changedTodo);
    setValue('');
    setIsEditing(false);
  };

  // const handleEditing = (ev) => {
  //   switch (ev.key) {
  //     case 'Enter':
  //       if (value.length === 0) {
  //         return;
  //       }

  //       const changedTodo = { ...todo, title: value };

  //       onSubmit(changedTodo);
  //       setValue('');
  //       setIsEditing(false);
  //       break;

  //     case 'Escape':
  //       setIsEditing(false);
  //       break;

  //     default:
  //       break;
  //   }
  // };

  // const handleBlur = () => {
  //   const changedTodo = { ...todo, title: value };

  //   onSubmit(changedTodo);
  //   setValue('');
  //   setIsEditing(false);
  // };

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

      <form onSubmit={handleSubmit}>
        <input
          className="edit"
          type="text"
          value={value}
          onChange={handleChange}
          // onKeyUp={handleEditing}
          // onBlur={handleBlur}
        />
      </form>
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
