/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

const TodoListItem = ({
  title,
  taskCompleted,
  labelId,
  id,
  deleteTodo,
  setCompleted,
}) => (
  <li className={ClassNames({ completed: taskCompleted })}>
    <div className="view">
      <input
        type="checkbox"
        className="toggle"
        id={labelId}
        onChange={() => setCompleted(id)}
      />
      <label htmlFor={labelId}>
        {title}
      </label>
      <button
        type="button"
        className="destroy"
        onClick={() => deleteTodo(id)}
      />
    </div>
  </li>
);

TodoListItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  taskCompleted: PropTypes.bool.isRequired,
  labelId: PropTypes.string.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  setCompleted: PropTypes.func.isRequired,
};

export default TodoListItem;
