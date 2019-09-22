/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

const TodoListItem = ({ title, completed }) => (
  <li className={ClassNames({ completed: !completed })}>
    <div className="view">
      <input type="checkbox" className="toggle" id="todo-2" />
      <label htmlFor="todo-4">
        {title}
      </label>
      <button type="button" className="destroy" />
    </div>
  </li>
);

TodoListItem.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};

export default TodoListItem;
