/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

const TodoListItem = ({ title, taskCompleted, labelId }) => (
  <li className={ClassNames({ completed: taskCompleted })}>
    <div className="view">
      <input type="checkbox" className="toggle" id={labelId} />
      <label htmlFor={labelId}>
        {title}
      </label>
      <button type="button" className="destroy" />
    </div>
  </li>
);

TodoListItem.propTypes = {
  title: PropTypes.string.isRequired,
  taskCompleted: PropTypes.bool.isRequired,
  labelId: PropTypes.string.isRequired,
};

export default TodoListItem;
