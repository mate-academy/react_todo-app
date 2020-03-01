import React, { Component } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

export class TodoItem extends Component {
  state = {
    newTask: '',
    editedTask: '',
  };

  handleEdit = (event) => {
    const { name } = event.target;
    const { task } = this.props.todo;

    this.setState({
      editedTask: name,
      newTask: task,
    });
  }

  taskChange = (event) => {
    const { value } = event.target;

    this.setState({
      newTask: value,
    });
  }

  submitChanges = (event) => {
    event.preventDefault();
    const { name } = event.target;
    const { newTask } = this.state;
    const { editTask } = this.props;

    if (!newTask) {
      return;
    }

    editTask(newTask, name);

    this.setState({
      editedTask: '',
    });
  }

  render() {
    const { task, id, completed } = this.props.todo;
    const { changeStatus, removeTask } = this.props;
    const { newTask, editedTask } = this.state;

    return (
      <li className={cx({
        editing: id === editedTask,
        completed,
      })}
      >
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id={id}
            checked={completed}
            onChange={changeStatus}
          />
          <label
            htmlFor={id}
          >
            {task}
          </label>
          <button
            type="button"
            className="edit-icon"
            name={id}
            onClick={this.handleEdit}
          />
          <button
            type="button"
            className="destroy"
            name={id}
            onClick={removeTask}
          />
        </div>
        <form onSubmit={this.submitChanges} name={id}>
          <input
            type="text"
            placeholder="Enter the task"
            className="edit"
            value={newTask}
            name={id}
            onChange={this.taskChange}
            onBlur={this.submitChanges}
          />
        </form>
      </li>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string,
    task: PropTypes.string,
    completed: PropTypes.bool,
  }).isRequired,
  removeTask: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
};
