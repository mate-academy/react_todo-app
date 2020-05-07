import React from 'react';
import PropTypes from 'prop-types';

export const TodoItem = ({
  todo,
  deleteTodo,
  // changeStatus,
  // changeTitle,
}) => {
  const { id, title, completed } = todo;

  return (
    <li>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={completed}
          id={id}
        />
        <label htmlFor={id}>{title}</label>
        <button type="button" className="destroy" onClick={deleteTodo} />
      </div>
      <input type="text" className="edit" />
    </li>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  // changeStatus: PropTypes.func.isRequired,
};
