import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = props => (
  <div className="view">
    <input
      onChange={() => props.changeStateComplete(props.todo.id)}
      checked={props.todo.complete}
      type="checkbox"
      className="toggle"
    />
    <label
      className={props.todo.complete ? 'view__completed' : ''}
    >
      {props.todo.title}
    </label>
    <button
      onClick={() => props.deleteTodo(props.index)}
      type="button"
      className="destroy"
    />
  </div>
);

TodoItem.propTypes = {
  changeStateComplete: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  todo: PropTypes.shape({
    complete: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    id: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
};

export default TodoItem;
