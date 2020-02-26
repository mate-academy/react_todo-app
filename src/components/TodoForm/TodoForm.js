import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class TodoForm extends Component {
  state = {
    title: '',
  }

  handleChange = ({ target }) => {
    const { value } = target;

    this.setState({
      title: value,
    });
  }

  handleSubmit = (evt) => {
    evt.preventDefault();

    const { title } = this.state;
    const { addTodo } = this.props;

    addTodo(title);

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
