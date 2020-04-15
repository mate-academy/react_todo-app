import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

export class InputTodo extends Component {
  state = {
    title: '',
  }

  handleChange = (event) => {
    this.setState({
      title: event.target.value.replace(/^\s/, ''),
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { title } = this.state;

    const todo = {
      title: title.trim(),
      id: uuidv4(),
      completed: false,
    };

    this.props.addTodo(todo);

    this.setState({
      title: '',
    });
  }

  render() {
    const { title } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.handleChange}
          value={title}
        />
      </form>
    );
  }
}

InputTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
