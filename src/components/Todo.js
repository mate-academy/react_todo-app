import React from 'react';
import PropTypes from 'prop-types';

const Todo = ({ todo, checkboxChange, deleteTodo, fixInput }) => (
  <li className={todo.completed ? 'completed' : ''} key={todo.id}>
    <div className="view">
      <input
        type="checkbox"
        className="toggle"
        checked={todo.completed}
        id={`todo-${todo.id}`}
        onChange={() => checkboxChange(todo.id)}
      />
      <label htmlFor={`todo-${todo.id}`} onDoubleClick={fixInput}>
        {todo.title}
      </label>
      <button
        type="button"
        className="destroy"
        onClick={() => deleteTodo(todo.id)}
      />
    </div>
    <input
      type="text"
      className="edit"
    />
  </li>
);

Todo.propTypes = {
  todo: PropTypes.shape({
    value: PropTypes.string,
  }).isRequired,
  checkboxChange: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  fixInput: PropTypes.func.isRequired,
};

export default Todo;
