import React from 'react';
import PropTypes from 'prop-types';

const Todo = ({
  todo, handleToggle, deleteTodo,
}) => (
  <li>
    <div className="view">
      <input
        type="checkbox"
        className="toggle"
        id={todo.id}
        checked={todo.completed}
        onChange={() => handleToggle(todo.id)}
      />
      {/* eslint-disable-next-line */}
      <label htmlFor={todo.id}>
        {todo.title}
      </label>
      <button
        type="button"
        className="destroy"
        onClick={() => deleteTodo(todo.id)}
      />
    </div>
  </li>
);

Todo.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
  }),
  handleToggle: PropTypes.func,
  deleteTodo: PropTypes.func,
}.isRequired;

export default Todo;
