import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { v4 as uuidv4 } from 'uuid';

export class NewTodo extends Component {
  state = {
    title: '',
  };

  changeHandler = (event) => {
    this.setState({
      title: event.target.value,
    });
  }

  addNewTodo = (event) => {
    event.preventDefault();
    const { title } = this.state;

    this.props.addTodo({
      title,
      id: uuidv4(),
      completed: false,
      inputError: false,
    });
    this.setState({
      title: '',
    });
  };

  render() {
    const { title } = this.state;

    return (
      <form action="" onSubmit={this.addNewTodo}>
        <input
          type="text"
          name="new-todo"
          className="new-todo"
          placeholder="Enter new todo please"
          value={title}
          onChange={this.changeHandler}
        />
      </form>
    );
  }
}

NewTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
