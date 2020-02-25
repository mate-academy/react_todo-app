import React, { Component } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

export class TodoItem extends Component {
  state = {
    edtiTitle: this.props.todo.task,
    placeholder: '',
  };

  markCompleted = (event) => {
    const { checked, id } = event.target;
    const { changeStatus } = this.props;

    changeStatus(id, checked);
  }

  deleteTask = (event) => {
    const { name } = event.target;
    const { removeTask } = this.props;

    removeTask(name);
  }

  handleEdit = (event) => {
    const { name } = event.target;
    const { editTask } = this.props;

    editTask(name);
  }

  taskChange = (event) => {
    const { value } = event.target;

    this.setState({
      edtiTitle: value,
    });
  }

  submitChanges = (event) => {
    const { name } = event.target;
    const { edtiTitle } = this.state;
    const { taskEdited } = this.props;

    if (event.key === 'Enter' || event.key === 'NumPadEnter') {
      if (!edtiTitle) {
        this.setState({
          placeholder: 'Enter the task',
        });
      } else {
        taskEdited(edtiTitle, name);
      }
    }
  }

  render() {
    const { task, id, completed } = this.props.todo;
    const { isEdit } = this.props;
    const { edtiTitle, placeholder } = this.state;

    return (
      <li className={cx({ editing: id === isEdit })}>
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id={id}
            checked={completed}
            onChange={this.markCompleted}
          />
          <label
            htmlFor={id}
            style={{ textDecoration: completed ? 'line-through' : 'none' }}
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
            onClick={this.deleteTask}
          />
        </div>
        <input
          type="text"
          className="edit"
          placeholder={placeholder}
          value={edtiTitle}
          name={id}
          onChange={this.taskChange}
          onKeyDown={this.submitChanges}
        />
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
  isEdit: PropTypes.string.isRequired,
  removeTask: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  taskEdited: PropTypes.func.isRequired,
};
