import React from 'react';
import PropTypes from 'prop-types';

export const Todo = ({ todo, toggledCheck, deleteTask }) => {
  const { id, title, completed } = todo;

  return (
    <li>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={completed}
          id={id}
          onChange={event => toggledCheck(event.target.checked)}
        />
        <label htmlFor={id}>{title}</label>
        <button
          type="button"
          className="destroy"
          onClick={deleteTask}
        />
      </div>
      <input type="text" className="edit" />
    </li>
  );
};

Todo.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  deleteTask: PropTypes.func.isRequired,
  toggledCheck: PropTypes.func.isRequired,
};
