import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { v4 as uuidv4 } from 'uuid';

export class InputTodo extends Component {
  state = {
    title: '',
    error: false,
  }

  handleChange = (event) => {
    this.setState({
      title: event.target.value.replace(/^\s/, ''),
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { title } = this.state;

    if (this.state.title.length < 7) {
      this.setState({
        error: true,
      });

      return;
    }

    const todo = {
      title,
      id: uuidv4(),
      completed: false,
    };

    this.props.addTodo(todo);

    this.setState({
      title: '',
      error: false,
    });
  }

  render() {
    const { title, error } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.handleChange}
          value={title}
        />
        <p className={cn('error', {
          'error--detected': error,
        })}
        >
          Enter todo length more 6 char
        </p>
      </form>
    );
  }
}

InputTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
