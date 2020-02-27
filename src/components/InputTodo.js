import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

export class InputTodo extends Component {
  state = {
    title: '',
  }

  handleChange = (event) => {
    this.setState({
      title: event.target.value,
    });
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      const { title } = this.state;

      const todo = {
        title,
        id: uuid(),
        completed: false,
      };

      this.props.addTodo(todo);

      this.setState({
        title: '',
      });
    }
  }

  render() {
    const { title } = this.state;

    return (
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        onChange={this.handleChange}
        onKeyPress={this.handleKeyPress}
        value={title}
      />
    );
  }
}

InputTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
