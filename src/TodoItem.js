import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({ todo, handleCompleted, handleDelete }) => {
  const currentClass = todo.completed ? 'completed' : '';

  return (
    <li className={currentClass}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="todo-1"
          onClick={() => handleCompleted(todo.id)}
          checked={todo.completed}
        />
        <label>{todo.title}</label>
        <button
          type="button"
          className="destroy"
          onClick={() => handleDelete(todo.id)}
        />
      </div>
    </li>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.string.isRequired,
  handleCompleted: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default TodoItem;
