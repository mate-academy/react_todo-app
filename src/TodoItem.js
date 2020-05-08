import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({ item: { id, text, completed }, doneTask, deleteTodo }) => (
  <li className={completed ? 'completed' : ''}>
    <div className="view">
      <input
        type="checkbox"
        className="toggle"
        id={id}
        onClick={() => doneTask(id)}
        checked={completed}
      />
      <label htmlFor={id}>{text}</label>
      <button
        type="button"
        className="destroy"
        onClick={() => deleteTodo(id)}
      />
    </div>
    <input type="text" className="edit" />
  </li>
);

TodoItem.propTypes = {
  doneTask: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};

export default TodoItem;
