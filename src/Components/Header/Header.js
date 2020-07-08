import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

export class Header extends Component {
  state = {
    value: '',
  }

  onChangeValue = (event) => {
    const { value } = event.target;

    this.setState({
      value,
    });
  }

  onSubmitTodo = (event) => {
    event.preventDefault();
    const { value } = this.state;

    if (!value) {
      return;
    }

    const { onAddTodo } = this.props;

    const todo = {
      id: uuidv4(),
      title: value,
      completed: false,
    };

    onAddTodo(todo);

    this.setState({
      value: '',
    });
  }

  render() {
    const { value } = this.state;

    return (
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={this.onSubmitTodo}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={value}
            onChange={this.onChangeValue}
          />
        </form>
      </header>
    );
  }
}

Header.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
};
