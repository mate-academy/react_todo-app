import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const TodoItem = ({ todo, onToggled, onDeleted }) => (
  <li className={cn(todo.completed && 'completed')}>
    <div className="view">
      <label
        className={cn(todo.completed && 'checked')}
        htmlFor={`todo-${todo.id}`}
      >
        <input
          type="checkbox"
          className="toggle"
          onChange={onToggled}
          checked={todo.completed}
          id={`todo-${todo.id}`}
        />

        {todo.title}
      </label>

      <button
        type="button"
        className="destroy"
        onClick={onDeleted}
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
  onToggled: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired,
};

export default TodoItem;
