import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({ todo, markTodoCompleted, deleteTodo }) => (
  <div className="view">
    <input
      type="checkbox"
      className="toggle"
      id={`todo-${todo.id}`}
      checked={todo.completed}
      onChange={(event) => {
        markTodoCompleted(event.target.checked, todo.id);
      }}
    />
    <label htmlFor={`todo-${todo.id}`}>{todo.title}</label>
    <button
      type="button"
      className="destroy"
      onClick={() => deleteTodo(todo.id)}
    />
  </div>
);

TodoItem.propTypes = {
  todo: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ])).isRequired,
  markTodoCompleted: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default TodoItem;
