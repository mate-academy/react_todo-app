import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({
  title,
  id,
  completed,
  deleteTodo,
  updateCompleted,
}) => (
  <div className="view">
    <input
      type="checkbox"
      className="toggle"
      id={id}
      onChange={updateCompleted}
      checked={completed}
    />
    <label htmlFor={id}>{title}</label>
    <button
      type="button"
      className="destroy"
      onClick={deleteTodo}
    />
  </div>
);

TodoItem.defaultProps = {
  completed: false,
};

TodoItem.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  updateCompleted: PropTypes.func.isRequired,
  completed: PropTypes.bool,
};

export default TodoItem;
