import React from 'react';
import PropTypes from 'prop-types';

export class TasksItem extends React.Component {
  state = {
    newValueTask: '',
    editIntVisible: false,
    date: new Date(),
  };

  changeCondition = (event) => {
    const { updateTasksCondition, task } = this.props;
    // double click - open edit input

    if (this.checkDoubleClick(event)) {
      return;
    }

    const updateConditionCheckedTask = {
      ...task,
      completed: !task.completed,
      value: this.state.newValueTask || task.value,
    };

    updateTasksCondition(updateConditionCheckedTask);
  };

  checkDoubleClick = (event) => {
    if ((new Date() - this.state.date) < 200) {
      this.setState(prevState => ({
        editIntVisible: !prevState.editIntVisible,
      }));

      return true;
    }

    this.setState({
      date: new Date(),
    });

    return false;
  };

  editTaskValue = (event) => {
    this.setState({
      newValueTask: event.target.value,
    });
  };

  changeConditionOnEnter = (event) => {
    if (event.key === 'Enter') {
      this.changeCondition();
    }
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
              onClick={this.changeCondition}
              defaultChecked={task.completed}
            />
            <label htmlFor={`todo-${task.id}`}>{task.value}</label>
            <button
              type="button"
              className="destroy"
              onClick={this.deleteTask}
            />
          </div>
          <input
            type="text"
            className="edit"
            defaultValue={
              this.state.newValueTask
                ? this.state.newValueTask
                : this.props.task.value
            }
            style={{
              display: `${this.state.editIntVisible ? 'block' : 'none'}`,
            }}
            onChange={this.editTaskValue}
            onKeyUp={this.changeConditionOnEnter}
          />
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
