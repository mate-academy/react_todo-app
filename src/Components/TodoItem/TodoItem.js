import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const TodoItem = ({ todo, allTasksSelected, handleTaskRemover }) => (
  <li className={cn({
    completed: allTasksSelected,
  })}
  >
    <div className="view">
      <input
        type="checkbox"
        className="toggle"
        id="todo-1"
        checked={allTasksSelected}
      />
      <label htmlFor="todo-1">{todo.title}</label>
      <button
        type="button"
        className="destroy"
        onClick={() => handleTaskRemover(todo.id)}
      />
    </div>
    <input type="text" className="edit" />
  </li>
);

TodoItem.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  allTasksSelected: PropTypes.bool.isRequired,
  handleTaskRemover: PropTypes.func.isRequired,
};

export default TodoItem;
