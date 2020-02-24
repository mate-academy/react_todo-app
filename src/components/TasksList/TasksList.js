import React from 'react';
import PropTypes from 'prop-types';
import { TasksItem } from '../TasksItem/TasksItem';

export class TasksList extends React.Component {
  render() {
    const {
      initialTasksList,
      // showCurrentTasks,
    } = this.props;

    return (
      <ul className="todo-list">
        {
          initialTasksList.map(task => (
            <TasksItem
              task={task}
              key={task.id}
              updateTasksCondition={this.props.updateTasksCondition}
            />
          ))
        }
      </ul>
    );
  }
}

TasksList.propTypes = {
  updateTasksCondition: PropTypes.func.isRequired,
  showCurrentTasks: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    id: PropTypes.number,
  })).isRequired,
  initialTasksList: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    id: PropTypes.number,
  })).isRequired,
};
