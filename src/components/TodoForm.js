import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

export default class TodoForm extends Component {
  state = {
    todoTitle: '',
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (event) => {
    const { todoTitle } = this.state;
    const { addTodo } = this.props;

    event.preventDefault();

    if ([...todoTitle].every(el => el === ' ')) {
      return;
    }

    addTodo({
      id: shortid.generate(),
      todoTitle,
      complete: false,
    });

    this.setState({
      todoTitle: '',
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          name="todoTitle"
          value={this.state.todoTitle}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}

TodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
