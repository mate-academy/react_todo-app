import React from 'react';
import PropTypes from 'prop-types';

export const TodoItem = ({ todo, onDeleteTodo, changeCompleteness }) => (
  <li className={todo.completed ? 'completed' : ''}>
    <div className="view">

      <input
        type="checkbox"
        className="toggle"
        checked={todo.completed}
        onChange={() => {
          changeCompleteness(todo.id);
        }}
      />

      <label>{todo.title}</label>

      <button
        onClick={() => onDeleteTodo(todo.id)}
        onChange={changeCompleteness}
        type="button"
        className="destroy"
      />

    </div>
    <input type="text" className="edit" />
  </li>
);

TodoItem.propTypes = {
  onDeleteTodo: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  changeCompleteness: PropTypes.func.isRequired,
  todo: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
};
