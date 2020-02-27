import React, { Component } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

export class TodoItem extends Component {
  state = {
    editTitle: '',
    placeholder: '',
    isEdit: '',
  };

  handleEdit = (event) => {
    const { name } = event.target;
    const { task } = this.props.todo;

    this.setState({
      isEdit: name,
      editTitle: task,
    });
  }

  taskChange = (event) => {
    const { value } = event.target;

    this.setState({
      editTitle: value,
    });
  }

  submitChanges = (event) => {
    const { name } = event.target;
    const { editTitle } = this.state;
    const { taskEdited } = this.props;

    if (!editTitle) {
      this.setState({
        placeholder: 'Enter the task',
      });

      return;
    }

    if (event.key === 'Enter' || event.key === 'NumPadEnter') {
      taskEdited(editTitle, name);
      this.setState({
        isEdit: '',
      });

      return;
    }

    if (!event.key) {
      taskEdited(editTitle, name);
      this.setState({
        isEdit: '',
      });
    }
  }

  render() {
    const { task, id, completed } = this.props.todo;
    const { changeStatus, removeTask } = this.props;
    const { editTitle, placeholder, isEdit } = this.state;

    return (
      <li className={cx({ editing: id === isEdit })}>
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id={id}
            checked={completed}
            onChange={event => changeStatus(event)}
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
            onClick={event => removeTask(event)}
          />
        </div>
        <input
          type="text"
          className="edit"
          placeholder={placeholder}
          value={editTitle}
          name={id}
          onChange={this.taskChange}
          onKeyDown={this.submitChanges}
          onBlur={this.submitChanges}
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
  removeTask: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired,
  taskEdited: PropTypes.func.isRequired,
};
