import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({ todo, i, isCompleted, deleteTodo }) => (
  <li className={todo.completed ? 'completed' : ''}>
    <div className="view">
      <input
        type="checkbox"
        className="toggle"
        checked={todo.completed}
        onChange={event => isCompleted(event.target.checked, todo.id)}
      />
      {/* eslint-disable-next-line */}
      <label>{todo.title}</label>
      <button
        type="button"
        className="destroy"
        onClick={() => deleteTodo(i)}
      />
    </div>
  </li>
);

TodoItem.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.number,
    completed: PropTypes.bool,
  }).isRequired,
  i: PropTypes.number.isRequired,
  isCompleted: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default TodoItem;
