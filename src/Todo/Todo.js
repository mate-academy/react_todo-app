import React from 'react';

import PropTypes from 'prop-types';

import classNames from 'classnames';

export const Todo = ({ todo, removeTodo, changeStatus }) => (
  <li className={classNames(
    {
      view: true,
      editing: false,
      completed: todo.completed,
    },
  )}
  >
    <input
      type="checkbox"
      className="toggle"
      id={todo.id}
      checked={todo.completed}
      onChange={event => changeStatus(+event.target.id)}
    />
    <label>{todo.title}</label>
    <button
      type="button"
      className="destroy"
      id={todo.id}
      onClick={() => removeTodo(todo.id)}
    />
    <input type="text" className="edit" />
  </li>
);

Todo.propTypes = {
  removeTodo: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired,
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }),
};
