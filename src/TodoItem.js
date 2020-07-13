import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

const TodoItem = ({ todo, onCheck, onDelete }) => (
  <li className={classnames({ completed: todo.completed })}>
    <div className="view">
      <input
        id={todo.id}
        className="toggle"
        type="checkbox"
        checked={todo.completed}
        onChange={() => onCheck(todo.id)}
      />
      <label htmlFor={todo.id}>{todo.title}</label>
      <button
        type="button"
        className="destroy"
        onClick={() => onDelete(todo.id)}
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
  onCheck: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TodoItem;
