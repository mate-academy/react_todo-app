import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({ todo, handleToggle, deleteTodo }) => (
  <li key={todo.id} className="">
    <div className="view">
      <input
        type="checkbox"
        className="toggle"
        id={todo.id}
        onChange={() => handleToggle(todo.id)}
        checked={todo.completed}
      />
      <label
        className={todo.completed ? 'completed' : null}
        htmlFor="todo-1">{todo.title}
      </label>
      <button
        type="button"
        className="destroy"
        onClick={() => deleteTodo(todo.id)} />
    </div>
  </li>
);

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
  }).isRequired,
  handleToggle: PropTypes.func,
  deleteTodo: PropTypes.func,

};

export default TodoItem;
