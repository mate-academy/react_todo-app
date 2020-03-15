import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { uuid } from 'uuidv4';

export class NewTodo extends Component {
  state = {
    title: '',
  }

  handleChange = ({ target: { value } }) => {
    this.setState({
      title: value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { title } = this.state;
    const { addTodo } = this.props;

    if (title.trim() === '') {
      return;
    }

    addTodo({
      title,
      id: uuid(),
      completed: false,
    });

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
          value={title}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}

NewTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
