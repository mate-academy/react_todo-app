import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export function TodoItem({ todo, changeStatus }) {
  return (
    <li
      className={classNames({ completed: todo.completed })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          value={todo.id}
          onClick={event => changeStatus(event.target.value)}
        />
        <label>{todo.title}</label>
        <button type="button" className="destroy" />
      </div>
      <input type="text" className="edit" />
    </li>
  );
}

TodoItem.propTypes = {
  changeStatus: PropTypes.func.isRequired,
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};
