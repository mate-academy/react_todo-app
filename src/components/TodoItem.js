import React from 'react';
import PropTypes from 'prop-types';
import { TodoShape } from './TodoShape';

export const TodoItem = ({ todo, onCheck, onDelete }) => (
  <li
    className={todo.completed ? 'completed' : ''}
  >
    <div className="view">
      <input
        type="checkbox"
        className="toggle"
        id={todo.id}
        checked={todo.completed}
        onChange={() => onCheck(todo.id)}
      />
      <label htmlFor={todo.id}>
        {todo.title}
      </label>
      <button
        type="button"
        className="destroy"
        onClick={() => onDelete(todo.id)}
      />
    </div>
    <input
      type="text"
      className="edit"
    />
  </li>
);

TodoItem.propTypes = {
  todo: TodoShape.isRequired,
  onCheck: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
