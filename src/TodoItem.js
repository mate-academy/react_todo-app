import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({ todo, changeStateComplete, deleteTodo, index }) => (
  <div className="view">
    <input
      onChange={() => changeStateComplete(todo.id)}
      checked={todo.complete}
      type="checkbox"
      className="toggle"
    />
    <label
      className={todo.complete ? 'view__completed' : ''}
    >
      {todo.title}
    </label>
    <button
      onClick={() => deleteTodo(index)}
      type="button"
      className="destroy"
    />
  </div>
);

TodoItem.propTypes = {
  changeStateComplete: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  todo: PropTypes.shape({
    complete: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    id: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
};

export default TodoItem;
