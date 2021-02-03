import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export const TodoItem = ({ todo, toggleStatusItem }) => (
  <li
    className={classnames({
      completed: todo.completed,
    })}
  >
    <div className="view">
      <input
        type="checkbox"
        className="toggle"
        onChange={() => {
          toggleStatusItem(todo.id);
        }}
        checked={todo.completed}
      />
      <label>
        {todo.title}
      </label>
      <button type="button" className="destroy" />
    </div>
    <input type="text" className="edit" />
  </li>
);

TodoItem.propTypes = {
  todo: PropTypes.shape({
    completed: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  toggleStatusItem: PropTypes.func.isRequired,
};
