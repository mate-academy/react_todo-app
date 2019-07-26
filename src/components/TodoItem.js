import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({ todo, onCheck, onRemove }) => (
  <li className={todo.completed ? 'completed' : ''}>
    <div className="view">
      <input
        type="checkbox"
        className="toggle"
        id={todo.id}
        onChange={() => onCheck(todo.id)}
        checked={todo.completed}
      />
      {/* eslint-disable-next-line */}
      <label htmlFor={todo.id}>
        {todo.title}
      </label>

      <button
        type="button"
        className="destroy"
        onClick={() => onRemove(todo)}
      />
    </div>
  </li>
);

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onCheck: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default TodoItem;
