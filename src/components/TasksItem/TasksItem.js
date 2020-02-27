import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

export class TasksItem extends React.Component {
  state = {
    newValueTask: this.props.task.value,
    editIntVisible: false,
  };

  textInput = React.createRef();

  toggleCompleted = (event) => {
    const { updateTasksCondition, task } = this.props;

    const updateConditionCheckedTask = {
      ...task,
      completed: !task.completed,
    };

    updateTasksCondition(updateConditionCheckedTask);
  };

  toggleEditInput = (event) => {
    event.preventDefault();
    this.setState(prevState => ({
      editIntVisible: !prevState.editIntVisible,
      newValueTask: prevState.newValueTask.trim(),
    }), () => this.textInput.current.focus());
  };

  sendNewTaskValue = () => {
    const { updateTasksCondition, task } = this.props;

    const updateConditionCheckedTask = {
      ...task,
      value: this.state.newValueTask.trim() || task.value.trim(),
    };

    this.setState(prevState => ({
      newValueTask: prevState.newValueTask || this.props.task.value,
    }));

    updateTasksCondition(updateConditionCheckedTask);
  };

  handleBlur = (event) => {
    if (this.state.editIntVisible) {
      this.toggleEditInput(event);
    }

    this.sendNewTaskValue();
  };

  editTaskValue = (event) => {
    this.setState({
      newValueTask: event.target.value,
    });
  };

  changeConditionEscapeKey = (event) => {
    if (event.key === 'Escape') {
      this.setState({
        newValueTask: this.props.task.value,
      });
      this.toggleEditInput(event);
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
          onDoubleClick={this.toggleEditInput}
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
          <form action="" onSubmit={this.toggleEditInput}>
            <input
              type="text"
              className="edit"
              value={this.state.newValueTask}
              onChange={this.editTaskValue}
              onKeyUp={this.changeConditionEscapeKey}
              onBlur={this.handleBlur}
              ref={this.textInput}
            />
          </form>
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
