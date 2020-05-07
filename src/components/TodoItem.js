import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({ id, title, completed, onToggleCompleted, onDeleted }) => (
  <>
    <li className={completed ? 'completed' : 'view'}>
      <div className="view">
        <input
          type="checkbox"
          checked={completed ? 'checked' : ''}
          className="toggle"
          id={`todo-${id}`}
          onChange={onToggleCompleted}
        />
        <label htmlFor={`todo-${id}`}>{title}</label>
        <button type="button" onClick={onDeleted} className="destroy" />
      </div>
      <input type="text" className="edit" />
    </li>

  </>
);

TodoItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool,
  onToggleCompleted: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired,
};

TodoItem.defaultProps = {
  completed: false,
};

export default TodoItem;
