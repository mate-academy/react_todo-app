import React from 'react';
import PropTypes from 'prop-types';

const Todo = ({ todo }) => (
  <li className={todo.completed ? 'completed' : ''}>
    <div className="view">
      <input
        type="checkbox"
        className="toggle"
        checked={todo.completed}
        id={`todo-${todo.id}`}
      />
      <label htmlFor={`todo-${todo.id}`}>
        {todo.title}
      </label>
      <button type="button" className="destroy" onClick={() => {}} />
    </div>
    <input type="text" className="edit" />
  </li>
);

Todo.propTypes = {
  todo: PropTypes.shape({
    value: PropTypes.string,
  }).isRequired,
};

export default Todo;
