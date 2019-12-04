import React from 'react';
import PropTypes from 'prop-types';

const Todo = ({
  id, complete, text, onChangeStatus, onDestroyTodo,
}) => (
  <li
    className={
      complete === 'completed' ? 'completed' : ''
    }
  >
    <div className="view">
      <input
        type="checkbox"
        className="toggle"
        id={`todo-${id}`}
        checked={complete === 'completed'}
        onChange={() => onChangeStatus(id)}
      />
      <label htmlFor={`todo-${id}`}>{text}</label>
      <button
        type="button"
        className="destroy"
        onClick={() => onDestroyTodo(id)}
      />
    </div>
  </li>
);

Todo.propTypes = {
  id: PropTypes.number.isRequired,
  complete: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onChangeStatus: PropTypes.func.isRequired,
  onDestroyTodo: PropTypes.func.isRequired,
};

export default Todo;
