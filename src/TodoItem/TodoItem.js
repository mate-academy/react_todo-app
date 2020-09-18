import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const TodoItem = ({ item, onToggle }) => {
  const [completedStatus, setCompletedStatus] = useState(item.completed);

  const toggleStatus = () => {
    setCompletedStatus(!completedStatus);
    onToggle(item.id);
  };

  return (
    <li className={completedStatus ? 'completed' : ''}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          onClick={toggleStatus}
        />
        <label>{item.title}</label>
        <button type="button" className="destroy" />
      </div>
      <input type="text" className="edit" />
    </li>
  );
};

TodoItem.propTypes = {
  item: PropTypes.shape().isRequired,
  onToggle: PropTypes.func.isRequired,
};
