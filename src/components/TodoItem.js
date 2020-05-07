import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({ todo, toggledCheck, deleteTask }) => {
  const { id, title, completed } = todo;

  return (
    <li>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={completed}
          id={id}
          onChange={evt => toggledCheck(evt.target.checked)}
        />
        <label htmlFor={id}>{title}</label>
        <button type="button" className="destroy" onClick={deleteTask} />
      </div>
      <input type="text" className="edit" />
    </li>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  deleteTask: PropTypes.func.isRequired,
  toggledCheck: PropTypes.func.isRequired,
};

export default TodoItem;
