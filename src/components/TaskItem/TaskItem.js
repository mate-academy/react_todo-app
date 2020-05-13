import React from 'react';
import propTypes from 'prop-types';

class TaskItem extends React.Component {
  state = {}

  render() {
    const { task, changeCondition, deleteTask } = this.props;

    return (
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
          <label>{task.title}</label>
          <button
            type="button"
            className="destroy"
            onClick={() => deleteTask(task.id)}
          />
        </div>
        <input type="text" className="edit" />
      </li>
    );
  }
}

TaskItem.propTypes = {
  task: propTypes.objectOf(propTypes.shape({
    id: propTypes.number.isRequired,
    title: propTypes.string.isRequired,
    completed: propTypes.bool.isRequired,
  })).isRequired,
  changeCondition: propTypes.func.isRequired,
  deleteTask: propTypes.func.isRequired,
};

export default TaskItem;
