import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

export const Todo = ({ id, title, completed, checkedTodo, deletedTodo }) => (
  <li key={id} className={cn({ completed })}>
    <div className="view">
      <input
        type="checkbox"
        className="toggle"
        checked={completed}
        onClick={() => checkedTodo(id)}
      />
      <label
        htmlFor={`todo-${id}`}

      >
        {title}
      </label>
      <button
        type="button"
        className="destroy"
        onClick={() => deletedTodo(id)}
      />
    </div>
    <input type="text" className="edit" />
  </li>
);

Todo.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  checkedTodo: PropTypes.func.isRequired,
  deletedTodo: PropTypes.func.isRequired,
};
