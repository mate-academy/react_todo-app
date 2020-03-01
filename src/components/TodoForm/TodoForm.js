import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

export class TodoForm extends Component {
  state = {
    title: '',
  }

  handleChange = ({ target }) => {
    const { value } = target;

    this.setState({
      title: value.replace(/^\s/, ''),
    });
  }

  handleSubmit = (evt) => {
    evt.preventDefault();

    const { title } = this.state;
    const { addTodo } = this.props;

    addTodo({
      title,
      id: uuidv4(),
      completed: false,
    });

    this.setState({
      title: '',
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={this.state.title}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}

TodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
