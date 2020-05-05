import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const Todo = ({ todo, deleteTodo, changeStatus }) => (
  <li className={classNames({
    view: true,
    completed: todo.completed,
  })}
  >
    <div className="view">
      <input
        type="checkbox"
        className="toggle"
        id={todo.id}
        onChange={() => changeStatus(todo.id)}
        checked={todo.completed}

      />
      <label htmlFor={todo.id}>{todo.title}</label>
      <button
        type="button"
        id={todo.id}
        className="destroy"
        onClick={deleteTodo}
      />
    </div>
    <input
      type="text"
      className="edit"
    />
  </li>
);

Todo.propTypes = {
  deleteTodo: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired,
  todo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
  }).isRequired,
};
