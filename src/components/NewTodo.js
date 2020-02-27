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

  handleSubmit = (event) => {
    event.preventDefault();

    const { task } = this.state;
    const { addTodo } = this.props;

    if (task.length > 0) {
      addTodo({
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
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={task}
            className="new-todo"
            onChange={this.handleChange}
            onKeyUp={this.handleSubmitEnter}
            placeholder="What needs to be done?"
          />
        </form>
      </header>
    );
  }
}

NewTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
