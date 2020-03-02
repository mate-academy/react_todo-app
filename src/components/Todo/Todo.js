import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export const Todo = (
  {
    changeStatusTodo,
    deleteTodo,
    todo: { title, id, completed },
  },
) => (
  <li
    className={cx({ completed })}
  >
    <div className="view">
      <input
        type="checkbox"
        className="toggle"
        checked={completed}
        onChange={() => changeStatusTodo(id)}
        id={id}
      />
      <label
        htmlFor="label"
      >
        {title}
      </label>
      <button
        type="button"
        className="destroy"
        onClick={() => deleteTodo(id)}
      />
    </div>
  </li>
);

export const todoTypes = {
  id: PropTypes.string,
  completed: PropTypes.bool,
  title: PropTypes.string,
};

Todo.propTypes = {
  todo: PropTypes.shape(todoTypes).isRequired,
  changeStatusTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};
