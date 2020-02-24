import React, { Component } from 'react';
import PropTypes from 'prop-types';

const uuidv1 = require('uuid/v1');

export default class TodoCreator extends Component {
  static propTypes = {
    addTodo: PropTypes.func.isRequired,
  }

  state = {
    newTodo: '',
  }

  handleChange = (e) => {
    const { value } = e.target;

    this.setState({
      newTodo: value,
    });
  }

  handleEnter = (e) => {
    const { newTodo } = this.state;

    if (e.key === 'Enter' && newTodo.trim().length > 0) {
      this.props.addTodo({
        title: newTodo,
        completed: false,
        id: uuidv1(),
      });
      this.setState({
        newTodo: '',
      });
    }
  }

  render() {
    const { newTodo } = this.state;

    return (
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        value={newTodo}
        onChange={this.handleChange}
        onKeyDown={this.handleEnter}
      />
    );
  }
}
