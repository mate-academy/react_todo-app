import React from 'react';
import PropTypes from 'prop-types';
import { TasksItem } from '../TasksItem/TasksItem';

export class TasksList extends React.Component {
  render() {
    const {
      initialTasksList,
      showCurrentTasks,
      updateTasksCondition,
      deleteTask,
    } = this.props;

    let showNow = null;

    if (showCurrentTasks === 'all') {
      showNow = initialTasksList;
    } else if (showCurrentTasks === 'completed') {
      showNow = initialTasksList.filter(task => task.completed);
    } else if (showCurrentTasks === 'active') {
      showNow = initialTasksList.filter(task => !task.completed);
    }

    return (
      <ul className="todo-list">
        {
          showNow.map(task => (
            <TasksItem
              task={task}
              key={task.id}
              updateTasksCondition={updateTasksCondition}
              deleteTask={deleteTask}
            />
          ))
        }
      </ul>
    );
  }
}

TasksList.propTypes = {
  updateTasksCondition: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  initialTasksList: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    id: PropTypes.string,
  })).isRequired,
};
