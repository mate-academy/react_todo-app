import React from 'react';
import PropTypes from 'prop-types';

export const Li = ({ todo, deleteTodo, toggleComplited }) => {
  const { id, title, completed } = todo;

  return (
    <li>
      <div className="view">
        <input
          type="checkbox"
          checked={completed}
          className="toggle"
          id={id}
          onChange={toggleComplited}
        />
        <label htmlFor={id}>{title}</label>
        <button type="button" className="destroy" onClick={deleteTodo} />
      </div>
      <input type="text" className="edit" />
    </li>
  );
};

Li.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  toggleComplited: PropTypes.func.isRequired,
};
