import React from 'react';
import PropTypes from 'prop-types';

export const Todo = ({ todo, toggledCheck, deleteTask }) => {
const { id, title, completed } = todo;
console.log(completed);

  return (
    <li>
      <div className="view">
        <input type="checkbox" className="toggle" id={id} onClick={toggledCheck} />
        <label htmlFor={id}>{title}</label>
        <button type="button" className="destroy" onClick={deleteTask} />
      </div>
      <input type="text" className="edit" />
    </li>
  );
};

Todo.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  deleteTask: PropTypes.func.isRequired,
  toggledCheck: PropTypes.func.isRequired,
};
