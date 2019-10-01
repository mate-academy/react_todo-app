import React from 'react';
import PropTypes from 'prop-types';

export default function Todo(props) {
  return (
    <li
      className=""
      style={{
        textDecoration:
          props.todo.complete
            ? 'line-through'
            : '',
        color:
          props.todo.complete
            ? '#e4e4e4'
            : '',
      }}
    >
      <div className="view">
        <input
          name="status"
          type="checkbox"
          className="toggle"
          id={props.todo.id}
          onChange={props.toggleComplete}
          checked={props.todo.complete ? 'checked' : ''}
        />
        <p htmlFor="todo-1">
          {props.text}
        </p>
        <button
          type="button"
          className="destroy"
          onClick={props.toDelete}
        />
      </div>
    </li>
  );
}

Todo.propTypes = {
  todo: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    completed: PropTypes.bool,
  })).isRequired,
  text: PropTypes.string.isRequired,
  toggleComplete: PropTypes.func.isRequired,
  toDelete: PropTypes.func.isRequired,
};
