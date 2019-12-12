import PropTypes from 'prop-types';
import React from 'react';

const TodoItem = ({ todo, handleCheck, handleDestroy }) => (
  <li className={todo.completed ? 'completed' : ''}>
    <div className="view">
      <input
        type="checkbox"
        className="toggle"
        id="todo"
        checked={todo.completed}
        onChange={() => handleCheck(todo.id)}
      />
      <label htmlFor="todo-1">{todo.title}</label>
      <button
        type="button"
        className="destroy"
        onClick={() => handleDestroy(todo.id)}
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
  handleDestroy: PropTypes.func.isRequired,
};

export default TodoItem;
