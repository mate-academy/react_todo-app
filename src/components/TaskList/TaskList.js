import React from 'react';
import PropTypes from 'prop-types';

const TaskList = ({ tasks }) => (
  <ul className="todo-list">
    {tasks.map(task => (
      <li key={task.id}>
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            checked={task.condition}
            id={task.id}
          />
          <label htmlFor={task.id}>
            {task.title}
          </label>
          <button type="button" className="destroy" />
        </div>
        <input type="text" className="edit" />
      </li>
    ))}

  </ul>
);

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default TaskList;
