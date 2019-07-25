import React from 'react';
import PropTypes from 'prop-types';

const Todo = ({ item, toggle }) => {
  const { id, title, completed } = item;

  return (
    <li className="todo">
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={id}
          onChange={() => toggle(id)}
          checked={completed}
        />
        <label htmlFor="todo-2">{title}</label>
        <button type="button" className="destroy" />
        <p>{completed}</p>
      </div>
    </li>
  );
};

Todo.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    id: PropTypes.number,
  }).isRequired,
  toggle: PropTypes.func,
};

Todo.defaultProps = {
  toggle: null,
};

export default Todo;
