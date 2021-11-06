import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const TodoItem = ({ todos, changeCompleted }) => (
  <>
    {todos.map(({ id, completed, title }) => (
      <li
        key={id}
        className={classNames({
          completed,
        })}
      >
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            checked={completed}
            onChange={() => changeCompleted(id)}
          />
          <label>{title}</label>
          <button type="button" className="destroy" />
        </div>
        <input type="text" className="edit" />
      </li>
    ))}

  </>
);
TodoItem.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
  changeCompleted: PropTypes.func.isRequired,
};
