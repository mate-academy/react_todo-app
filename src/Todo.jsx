import React from 'react';
import PropTypes from 'prop-types';

const Todo = ({ todo, toggle, destroyTodo }) => {
  const completedStyle = {
    fontStyle: 'italic',
    color: '#cdcdcd',
    textDecoration: 'line-through',
  };

  return (
    <li>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={todo.id}
          onChange={() => toggle(todo.id)}
          checked={todo.completed}
        />
        <label
          htmlFor="todo-1"
          style={todo.completed ? completedStyle : null}
        >
          {' '}
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
};

Todo.propTypes = {
  todo: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggle: PropTypes.func.isRequired,
  destroyTodo: PropTypes.func.isRequired,
};

export default Todo;
