import PropTypes from 'prop-types';
import React from 'react';

const TodoItem = ({ todo, handleCheck, handleDelete }) => (
  <li className={todo.isCompleted ? 'completed' : ''} key={todo.id}>
    <div className="view">
      <input
        type="checkbox"
        className="toggle"
        id={todo.id}
        checked={todo.isCompleted}
        onChange={() => handleCheck(todo.id)}
      />
      <label className="todo">{todo.title}</label>
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
      isCompleted: PropTypes.bool.isRequired,
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  handleCheck: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default TodoItem;
