import React, { Component } from 'react';
import propTypes from 'prop-types';

class TodoApp extends Component {
  state = {
    input: '',
  };

  addTask = () => {
    const { input } = this.state;

    if (input.trim()) {
      this.props.addTask(input);
      this.setState({ input: '' });
    }
  }

  inputChange = event => this.setState({ input: event.target.value });

  handleSubmit = (event) => {
    event.preventDefault();
    this.addTask();
  }

  render() {
    const { input } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={this.inputChange}
          className="new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    );
  }
}

TodoApp.propTypes = {
  addTask: propTypes.func.isRequired,
};

export default TodoApp;
