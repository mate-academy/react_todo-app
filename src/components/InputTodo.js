import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import uuid from 'uuid/v4';

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

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      const { title } = this.state;

      if (this.state.title.length < 7) {
        this.setState({
          error: true,
        });

        return;
      }

      const todo = {
        title,
        id: uuid(),
        completed: false,
      };

      this.props.addTodo(todo);

      this.setState({
        title: '',
        error: false,
      });
    }
  }

  render() {
    const { title, error } = this.state;

    return (
      <>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          value={title}
        />
        <p className={cn('error', { 'error--detected': error })}>
          Enter todo length more 6 char
        </p>
      </>
    );
  }
}

InputTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
