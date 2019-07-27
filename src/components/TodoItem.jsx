import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({ todo, handleTodoToggle, handleDestroyTodo }) => (
  <li className="">
    <div className="view">
      <input
        checked={todo.completed}
        type="checkbox"
        className="toggle"
        id={todo.id}
        onChange={() => handleTodoToggle(todo.id)}
      />
      {/* eslint-disable-next-line */}
      <label
        className={todo.completed ? 'todo--completed' : null}
        htmlFor={todo.id}
      >
        {todo.title}

      </label>

      <button
        onClick={() => handleDestroyTodo(todo.id)}
        type="button"
        className="destroy"
      />
    </div>
  </li>
);

TodoItem.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string,
    completed: PropTypes.bool,
    id: PropTypes.instanceOf(Date),
  }).isRequired,
  handleTodoToggle: PropTypes.func,
  handleDestroyTodo: PropTypes.func,
};

TodoItem.defaultProps = {
  handleTodoToggle: () => {},
  handleDestroyTodo: () => {},
};

export default TodoItem;
