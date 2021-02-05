import React, { useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export const TodoItem = ({ title, completed }) => {
  const [isCompleted, setIsCompleted] = useState(completed);

  return (
    <li className={classnames({ completed: isCompleted })}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          onClick={() => setIsCompleted(current => !current)}
        />
        <label>{title}</label>
        <button type="button" className="destroy" />
      </div>
      <input type="text" className="edit" />
    </li>
  );
};

TodoItem.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};
