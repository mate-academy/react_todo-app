import React from 'react';
import PropTypes from 'prop-types';

function TodoItem({ todo, handleToggle, handleRemove }) {
  return (
    <li className={todo.completed ? 'completed' : ''}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`todo-${todo.id}`}
          checked={todo.completed}
          onChange={() => handleToggle(todo.id)}
        />
        {/* eslint-disable-next-line jsx-a11y/label-has-for */}
        <label htmlFor={`todo-${todo.id}`}>{todo.title}</label>
        <button
          type="button"
          className="destroy"
          onClick={() => handleRemove(todo.id)}
        />
      </div>
    </li>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.objectOf(PropTypes.object).isRequired,
  handleToggle: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
};
export default TodoItem;
