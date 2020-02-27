import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { uuid } from 'uuidv4';

export class NewTodo extends Component {
  state = {
    task: '',
  }

  handleChange = (event) => {
    this.setState({
      task: event.target.value.trim(),
    });
  }

  handleSubmitEnter = (event) => {
    const { task } = this.state;

    if (event.key === 'Enter' && task.length > 0) {
      this.props.addTodo({
        task,
        completed: false,
        id: uuid(),
      });

      this.setState({
        task: '',
      });
    }
  }

  render() {
    const { task } = this.state;

    return (
      <header className="header">
        <h1>todos</h1>
        <input
          type="text"
          value={task}
          className="new-todo"
          onChange={this.handleChange}
          onKeyUp={this.handleSubmitEnter}
          placeholder="What needs to be done?"
        />
      </header>
    );
  }
}

NewTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
