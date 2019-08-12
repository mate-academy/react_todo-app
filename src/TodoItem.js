import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({ todo, toggleTodo, destroyTodo }) => (
  <li>
    <div className="view">
      <input
        type="checkbox"
        className="toggle"
        id={todo.id}
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />
      {/* eslint-disable-next-line */}
      <label htmlFor={todo.id}>
        {todo.title}
      </label>
      <button
        type="button"
        className="destroy"
        onClick={() => destroyTodo(todo.id)}
      />
    </div>
  </li>
);

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
  }),
  toggleTodo: PropTypes.func,
  destroyTodo: PropTypes.func,
}.isRequired;

export default TodoItem;
