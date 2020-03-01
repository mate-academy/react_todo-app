import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

export const Todo = ({ todo, deleteTodo, markAsCompleted }) => {
  const { title, completed, id } = todo;

  return (
    <li className={cn({ completed })}>
      <div className="view">
        <input
          id={id}
          type="checkbox"
          className="toggle"
          checked={completed}
          onChange={event => markAsCompleted(event.target.checked)}
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
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  markAsCompleted: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};
