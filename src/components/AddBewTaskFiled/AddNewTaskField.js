import React from 'react';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';

export class AddNewTaskField extends React.Component {
  state = {
    value: '',
  };

  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  sendNewTask = (event) => {
    event.preventDefault();
    const { value } = this.state;

    if (!value.trim()) {
      return false;
    }

    const newTask = {
      value,
      completed: false,
      id: v4(),
    };

    this.props.updateInitialTasks(newTask);
    this.setState({
      value: '',
    });

    return true;
  };

  render() {
    return (
      <form action="" onSubmit={this.sendNewTask}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={this.state.value}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}

AddNewTaskField.propTypes = {
  updateInitialTasks: PropTypes.func.isRequired,
};
