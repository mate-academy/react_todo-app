import PropTypes from 'prop-types';
import React from 'react';
import cn from 'classnames';

const TodoItem = ({ todo, handleCheck, handleDelete }) => (
  <li className={cn({ completed: todo.completed })}>
    <div className="view">
      <input
        type="checkbox"
        className="toggle"
        id={todo.id}
        checked={todo.completed}
        onChange={() => handleCheck(todo.id)}
      />
      <label htmlFor={todo.id}>{todo.title}</label>
      <button
        type="button"
        className="destroy"
        onClick={() => handleDelete(todo.id)}
      />
    </div>
  </li>
);

TodoItem.propTypes = {
  todo: PropTypes
    .shape({
      completed: PropTypes.bool.isRequired,
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  handleCheck: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default TodoItem;
