import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

export const TodoItem = (props) => {
  const { title, id, completed, onDeleteTodo, onUpdateCompleted } = props;

  return (
    <li className={cn({ completed })}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={id}
          onChange={onUpdateCompleted}
          checked={completed ? 'checked' : ''}
        />
        <label htmlFor={id}>{title}</label>
        <button
          type="button"
          className="destroy"
          onClick={onDeleteTodo}
        />
      </div>
      <input type="text" className="edit" />
    </li>
  );
};

TodoItem.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
  onUpdateCompleted: PropTypes.func.isRequired,
};
