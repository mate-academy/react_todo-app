/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

const TodoListItem = ({ title, completed, labelId }) => (
  <li className={ClassNames({ completed: !completed })}>
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
  completed: PropTypes.bool.isRequired,
  labelId: PropTypes.string.isRequired,
};

export default TodoListItem;
