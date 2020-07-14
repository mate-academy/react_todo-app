import React from 'react';
import { PropTypes } from 'prop-types';
// import cn from 'classnames';

export const TodoItem = (props) => {
  const {
    todo,
  } = props;

  return (
    <li>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`todo-${todo.id}`}
          checked={todo.completed}
        />
        <label htmlFor={`todo-${todo.id}`}>
          {todo.title}
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
};
