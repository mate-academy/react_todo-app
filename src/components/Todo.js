import React from 'react';
import PropTypes from 'prop-types';

export const Todo = ({ todo, toggleCheck, deleteTodo }) => {
  const { id, title, completed } = todo;

  return (
    <li>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={id}
          checked={completed}
          onChange={toggleCheck}
        />
        <label htmlFor={id}>{title}</label>
        <button
          type="button"
          className="destroy"
          onClick={() => deleteTodo(id)}
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
  deleteTodo: PropTypes.func.isRequired,
  toggleCheck: PropTypes.func.isRequired,
};
