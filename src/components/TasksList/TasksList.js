import React from 'react';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';
import { TasksItem } from '../TasksItem/TasksItem';

export class TasksList extends React.Component {
  render() {
    const {
      initialTasksList,
      updateTasksCondition,
      deleteTask,
    } = this.props;

    return (
      <ul className="todo-list">
        {
          initialTasksList.map(task => (
            <TasksItem
              task={task}
              key={v4()}
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
