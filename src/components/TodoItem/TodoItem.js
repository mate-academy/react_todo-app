import React from 'react';
import propTypes from 'prop-types';
import './TodoItem.css';

const TodoItem = ({ task, changeCondition, deleteTask }) => (
  <li
    key={task.id}

  >
    <div className="view">
      <input

        type="checkbox"
        className="toggle"
        checked={task.completed}
        id={task.id}
        onClick={() => changeCondition(task.id)}
      />

      <label
        className={task.completed
          ? 'complete'
          : 'inProgress'}
      >
        {task.title}
      </label>
      <button
        type="button"
        className="destroy"
        onClick={() => deleteTask(task.id)}
      />
    </div>
    <input type="text" className="edit" />
  </li>
);

TodoItem.propTypes = {
  task: propTypes.objectOf(propTypes.shape({
    id: propTypes.number.isRequired,
    title: propTypes.string.isRequired,
    completed: propTypes.bool.isRequired,
  })).isRequired,
  changeCondition: propTypes.func.isRequired,
  deleteTask: propTypes.func.isRequired,
};

export default TodoItem;
