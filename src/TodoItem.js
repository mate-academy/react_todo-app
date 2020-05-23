import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';

const TodoItem = ({ todo, changeComplete, deleteTodo }) => {
  const { id, title, completed } = todo;

  return (
    <li className={className({
      completed,
    })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={completed}
          id={id}
          onChange={e => changeComplete(e.target.checked)}
        />
        <label htmlFor={id}>{title}</label>
        <button type="button" className="destroy" onClick={deleteTodo} />
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
  deleteTodo: PropTypes.func.isRequired,
  changeComplete: PropTypes.func.isRequired,
};

export default TodoItem;
