import React from 'react';
import PropTypes from 'prop-types';

export default function TodoItem({
  id,
  todo,
  onDeleted,
  onToggle,
  completed,
}) {
  const classNames = completed ? 'completed' : '';

  return (
    <li
      className={classNames}
      key={id}
    >
      <div className="view">
        <input
          type="checkbox"
          onClick={onToggle}
          className="toggle"
          id={`todo-${id}`}
        />
        <label htmlFor={`todo-${id}`}>{todo}</label>
        <button
          type="button"
          className="destroy"
          onClick={onDeleted}
        />
      </div>
    </li>
  );
}

TodoItem.propTypes = {
  id: PropTypes.number.isRequired,
  todo: PropTypes.string.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
};
