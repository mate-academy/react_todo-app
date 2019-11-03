import React from 'react';
import classNames from 'classnames';
import { TodoListItemProps } from '../../constants/proptypes';

const TodoListItem = ({
  id,
  label,
  onDeleted,
  onToggleDone,
  completed,
}) => {
  const classes = classNames({
    completed,
  });

  return (
    <li className={classes} key={id}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={completed}
          id={`todo-${id}`}
          onChange={onToggleDone}
        />
        <label
          htmlFor={`todo-${id}`}
        >
          {label}
        </label>

        <button
          type="button"
          className="destroy"
          onClick={onDeleted}
        />
      </div>
    </li>
  );
};

TodoListItem.propTypes = TodoListItemProps;

export default TodoListItem;
