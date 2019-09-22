import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TodoApp extends Component {
  state = {
    task: '',
  }

  handlePressKey = (event) => {
    const { key } = event;
    const { value } = event.target;

    if (key === 'Enter') {
      this.props.addTodo(value);
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

        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={this.state.task}
          onKeyPress={this.handlePressKey}
          onChange={this.handleOnChange}
        />
      </header>
    );
  }
}

TodoApp.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default TodoApp;
