import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

export class TasksItem extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  state = {
    newValueTask: '',
    editIntVisible: false,
  };

  toggleComplited = (event) => {
    const { updateTasksCondition, task } = this.props;

    const updateConditionCheckedTask = {
      ...task,
      completed: !task.completed,
    };

    updateTasksCondition(updateConditionCheckedTask);
  };

  handleDoubleClick = (event) => {
    const { updateTasksCondition, task } = this.props;

    this.setState(prevState => ({
      editIntVisible: !prevState.editIntVisible,
    }), () => this.textInput.current.focus());

    const updateConditionCheckedTask = {
      ...task,
      value: this.state.newValueTask || task.value,
    };

    updateTasksCondition(updateConditionCheckedTask);
  };

  handleBlur = () => {
    if (this.state.editIntVisible) {
      this.handleDoubleClick();
    }
  };

  editTaskValue = (event) => {
    this.setState({
      newValueTask: event.target.value,
    });
  };

  changeConditionOnEnter = (event) => {
    if (event.key === 'Enter') {
      this.handleDoubleClick();
    } else if (event.key === 'Escape') {

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
        <li
          className={classNames(this.state.editIntVisible ? 'editing' : 'view', task.completed ? 'completed' : '')}
          key={task.id}
          onDoubleClick={this.handleDoubleClick}
          // onClick={(event)=> {
          //   event.preventDefault();
          // }}
        >
          <div className="view">
            <input
              type="checkbox"
              className="toggle"
              id={`todo-${task.id}`}
              onChange={this.toggleComplited}
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
            defaultValue={task.value || this.state.newValueTask}
            onChange={this.editTaskValue}
            onKeyUp={this.changeConditionOnEnter}
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
