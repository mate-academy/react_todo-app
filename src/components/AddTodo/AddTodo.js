import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TodoApp extends Component {
  state = {
    task: '',
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { task } = this.state;

    if (task) {
      this.props.addTodo(task);
      this.setState({ task: '' });
    }
  }

  handleOnChange = (event) => {
    const { value } = event.target;

    this.setState({ task: value });
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={event => this.handleSubmit(event)}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={this.state.task}
            onChange={this.handleOnChange}
          />
        </form>
      </header>
    );
  }
}

TodoApp.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default TodoApp;
