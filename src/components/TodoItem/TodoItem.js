import React from 'react';
import PropTypes from 'prop-types';
import CN from 'classnames';

export const TodoItem = (
  { title,
    completed,
    id,
    deleteTodo,
    completedTodo },
) => (
  <li className={CN({ completed })}>
    <div className="view">
      <input
        type="checkbox"
        className="toggle"
        id={id}
        onClick={() => completedTodo(id)}
      />
      <label htmlFor="todo-1">
        {title}
      </label>
      <button
        type="button"
        className="destroy"
        onClick={() => deleteTodo(id)}
      />
    </div>
    <input type="text" className="edit" />
  </li>
);

TodoItem.propTypes = {
  deleteTodo: PropTypes.func.isRequired,
  completedTodo: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  completed: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};
