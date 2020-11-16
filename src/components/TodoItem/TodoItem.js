import React from 'react';
import PropTypes from 'prop-types';

export const TodoItem = ({ todo, onChangeStatus }) => (
  <li className={todo.completed ? 'completed' : ''}>
    <div className="view">
      <input
        type="checkbox"
        className="toggle"
        checked={todo.completed}
        onChange={() => onChangeStatus(todo.id, todo.completed)}
      />
      <label>{todo.title}</label>
      <button type="button" className="destroy" />
    </div>
    <input type="text" className="edit" />
  </li>
);

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onChangeStatus: PropTypes.func.isRequired,
};
