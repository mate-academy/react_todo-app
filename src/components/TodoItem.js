import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const TodoItem = ({ todo, onToggle, onDelete }) => (
  <li className={cn(todo.completed && 'completed')}>
    <div className={cn('view')}>
      <label
        className={cn(todo.completed && 'checked')}
        htmlFor={`todo-${todo.id}`}
      >
        <input
          type="checkbox"
          className={cn('toggle')}
          onChange={onToggle}
          checked={todo.completed}
          id={`todo-${todo.id}`}
        />

        {todo.title}
      </label>

      <button
        type="button"
        className={cn('destroy')}
        onClick={onDelete}
      />
    </div>
  </li>
);

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TodoItem;
