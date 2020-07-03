import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Header extends Component {
  state = {
    placeholder: 'What needs to be done?',
    inputValue: '',
  };

  handleSetTodoValue = (e) => {
    this.setState({
      inputValue: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { inputValue } = this.state;

    if (inputValue === '') {
      this.setState({
        placeholder: 'YOU HAVE TO INPUT TODO',
      });

      return;
    }

    const valueTodo = this.state.inputValue;

    this.props.addTodo(valueTodo);
    this.setState({
      inputValue: '',
      placeholder: 'What needs to be done?',
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          onChange={this.handleSetTodoValue}
          value={this.state.inputValue}
          className="new-todo"
          placeholder={this.state.placeholder}
        />
      </form>
    );
  }
}
Header.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
