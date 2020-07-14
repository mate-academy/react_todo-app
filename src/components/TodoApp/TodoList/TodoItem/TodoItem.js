import React from 'react';
import { PropTypes } from 'prop-types';
// import cn from 'classnames';

export const TodoItem = (props) => {
  const {
    todo,
    onStatus,
  } = props;

  return (
    <li>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`todo-${todo.id}`}
          checked={todo.completed}
          onChange={() => onStatus(todo.id)}
        />
        <label htmlFor={`todo-${todo.id}`}>
          {todo.title}
          {` > ${todo.completed.toString()}`}
        </label>
        <button type="button" className="destroy" />
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
};
