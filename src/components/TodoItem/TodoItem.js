import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({ todo, complete, deleteTodo }) => {
  return (
    <li>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          onChange={() => complete(todo.id)}
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
  complete: PropTypes.func.isRequired,
  todo: PropTypes.shape({
    text: PropTypes.string.isRequired,
    complete: PropTypes.bool.isRequired,
  }).isRequired,
};

export default TodoItem;
