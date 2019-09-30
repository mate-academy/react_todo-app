import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({ todo, toggleComplete , deleteTodo }) => {
  return (
    <li>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          onChange={() => toggleComplete (todo.id)}
          checked={todo.completed}
        />
        <label>{todo.title}</label>
        <button
          type="button"
          className="destroy"
          onClick={() => deleteTodo(todo.id)}
        />
      </div>
    </li>
  );
};

TodoItem.propTypes = {
  deleteTodo: PropTypes.func.isRequired,
  toggleComplete : PropTypes.func.isRequired,
  todo: PropTypes.shape({
    text: PropTypes.string.isRequired,
    toggleComplete : PropTypes.bool.isRequired,
  }).isRequired,
};

export default TodoItem;
