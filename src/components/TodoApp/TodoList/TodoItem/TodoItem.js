import React from 'react';
import { PropTypes } from 'prop-types';
import cn from 'classnames';

export const TodoItem = (props) => {
  const {
    todo,
    onStatus,
    onRemove,
  } = props;
  const {
    id,
    title,
    completed,
  } = todo;

  return (
    <li
      className={cn({ completed })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`todo-${id}`}
          checked={completed}
          onChange={() => onStatus(id)}
        />
        <label htmlFor={`todo-${id}`}>
          {title}
          {` > ${completed.toString()}`}
        </label>
        <button
          type="button"
          className="destroy"
          onClick={() => onRemove(id)}
        />
      </div>
      <input type="text" className="edit" />
    </li>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onStatus: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};
