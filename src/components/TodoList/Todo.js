import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

export const Todo = (props) => {
  const {
    title,
    completed,
    id,
    deleteTodo,
    completedTodo,
  } = props;

  return (
    <li className={cn({ completed })}>
      <div className="view">
        <input
          id={id}
          type="checkbox"
          className="toggle"
          checked={completed}
          onChange={() => completedTodo(id)}
        />
        <label htmlFor="todo-1">{title}</label>
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
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  completedTodo: PropTypes.func.isRequired,
  completed: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};
