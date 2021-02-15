import React from 'react';
import PropTypes from 'prop-types';

export const TodoItem = ({ todo, onToggle, onDelete }) => {
  const { title, id, completed } = todo;

  return (
    <li key={id} className={completed ? 'completed' : ''}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={!!completed}
          onChange={() => onToggle(id)}
        />

        <label>{title}</label>

        <button
          type="button"
          className="destroy"
          onClick={() => onDelete(title)}
        />
      </div>
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
};
