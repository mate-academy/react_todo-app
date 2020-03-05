import React from 'react';
import PropTypes from 'prop-types';

export const TodoItem = (props) => {
  const {
    id,
    title,
    completed,
    deletetask,
    toggleCompleted,
  } = props;

  return (
    <li className={completed ? 'completed' : ''}>
      <div className="view">
        <input
          id={id}
          type="checkbox"
          className="toggle"
          checked={completed}
          onChange={() => toggleCompleted(id)}
        />
        <label htmlFor={id}>{title}</label>
        <button
          type="button"
          className="destroy"
          onClick={() => deletetask(id)}
        />
      </div>
    </li>
  );
};

export const TodoItemProps = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};

TodoItem.propTypes = {
  ...TodoItemProps,
};
