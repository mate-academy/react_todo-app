import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const TodoItem = ({
  title,
  id,
  completed,
  changeStatus,
  deleteTodo,
}) => {
  const [changingTitle, setChangingTitle] = useState(false);

  return (
    <li
      className={completed ? 'completed' : ''}
      onDoubleClick={() => {
        setChangingTitle(!changingTitle);
      }}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={completed}
          onChange={() => {
            changeStatus(id);
          }}
        />
        <label>{title}</label>
        <button
          type="button"
          className="destroy"
          onClick={() => {
            deleteTodo(id);
          }}
        />
      </div>
      <input type="text" className="edit" />
    </li>
  );
};

TodoItem.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  completed: PropTypes.bool.isRequired,
  changeStatus: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};
