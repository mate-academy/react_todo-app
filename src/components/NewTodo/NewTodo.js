import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { v4 as uuidv4 } from 'uuid';

export class NewTodo extends Component {
  static propTypes = {
    addTodo: PropTypes.func.isRequired,
  };

  state = {
    title: '',
  };

  changeHandler = (event) => {
    this.setState({
      title: event.target.value,
    });
  }

  enterHandler = (event) => {
    const { title } = this.state;

    if (event.key === 'Enter' && title.trim().length >= 1) {
      this.props.addTodo({
        title: event.target.value,
        id: uuidv4(),
        completed: false,
        inputError: false,
      });
      this.setState({
        title: '',
      });
    }
  };

  render() {
    const { title } = this.state;

    return (
      <input
        type="text"
        name="new-todo"
        className="new-todo"
        placeholder="Enter new todo please"
        value={title}
        onChange={this.changeHandler}
        onKeyDown={this.enterHandler}
      />
    );
  }
}
