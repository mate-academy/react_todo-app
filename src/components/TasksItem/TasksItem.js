import React from 'react';
import PropTypes from 'prop-types';

export class TasksItem extends React.Component {
  toggleComplited = (event) => {
    const { updateTasksCondition, task } = this.props;
    // const checkedTask = showCurrentTasks.find(item => task.id === item.id);
    const updateConditionCheckedTask = {
      ...task,
      completed: !task.completed,
    };

    updateTasksCondition(updateConditionCheckedTask);
  };

  deleteTask = () => {
    const { deleteTask, task } = this.props;
    const updateConditionCheckedTask = {
      ...task,
      delete: true,
    };

    deleteTask(updateConditionCheckedTask);
  };

  render() {
    const { task } = this.props;

    return (
      <>
        <li className={task.completed ? 'completed' : 'view'} key={task.id}>
          <div className="view">
            <input
              type="checkbox"
              className="toggle"
              id={`todo-${task.id}`}
              onClick={this.toggleComplited}
              defaultChecked={task.completed}
            />
            <label htmlFor={`todo-${task.id}`}>{task.value}</label>
            <button
              type="button"
              className="destroy"
              onClick={this.deleteTask}
            />
          </div>
          <input type="text" className="edit" />
        </li>
      </>
    );
  }
}

TasksItem.propTypes = {
  task: PropTypes.shape({
    completed: PropTypes.bool,
    id: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,

  updateTasksCondition: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};
