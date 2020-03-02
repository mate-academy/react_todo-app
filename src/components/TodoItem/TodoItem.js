import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

export const TodoItem = ({ todo, onDeleteTodo, onUpdateCompleted }) => {
  const {
    title,
    id,
    completed,
  } = todo;

  return (
    <li className={cn({ completed })}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={id}
          onChange={onUpdateCompleted}
          checked={completed}
        />
        <label htmlFor={id}>{title}</label>
        <button
          type="button"
          className="destroy"
          onClick={onDeleteTodo}
        />
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
  onDeleteTodo: PropTypes.func.isRequired,
  onUpdateCompleted: PropTypes.func.isRequired,
};
