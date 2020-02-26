import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

export class TasksItem extends React.Component {
  textInput = React.createRef();

  state = {
    newValueTask: this.props.task.value,
    editIntVisible: false,
  };

  toggleCompleted = (event) => {
    const { updateTasksCondition, task } = this.props;

    const updateConditionCheckedTask = {
      ...task,
      completed: !task.completed,
    };

    updateTasksCondition(updateConditionCheckedTask);
  };

  ToggleEditInput = (event) => {
    this.setState(prevState => ({
      editIntVisible: !prevState.editIntVisible,
    }), () => this.textInput.current.focus());
  };

  sendNewTaskValue = () => {
    const { updateTasksCondition, task } = this.props;

    const updateConditionCheckedTask = {
      ...task,
      value: this.state.newValueTask || task.value,
    };

    updateTasksCondition(updateConditionCheckedTask);
  };

  handleBlur = () => {
    if (this.state.editIntVisible) {
      this.ToggleEditInput();
    }

    this.sendNewTaskValue();
  };

  editTaskValue = (event) => {
    this.setState({
      newValueTask: event.target.value,
    });
  };

  changeConditionOnHotKey = (event) => {
    if (event.key === 'Enter') {
      this.ToggleEditInput();
    } else if (event.key === 'Escape') {
      this.setState({
        newValueTask: this.props.task.value,
      });
      this.ToggleEditInput();
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
    const cx = classNames(
      this.state.editIntVisible
        ? 'editing'
        : 'view',
      task.completed
        ? 'completed'
        : '',
    );

    return (
      <>
        <li
          className={classNames(cx)}
          key={task.id}
          onDoubleClick={this.ToggleEditInput}
        >
          <div className="view">
            <input
              type="checkbox"
              className="toggle"
              id={`todo-${task.id}`}
              onChange={this.toggleCompleted}
              checked={task.completed}
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
            value={this.state.newValueTask || ''}
            onChange={this.editTaskValue}
            onKeyUp={this.changeConditionOnHotKey}
            onBlur={this.handleBlur}
            ref={this.textInput}
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
