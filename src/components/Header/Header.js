import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Header extends Component {
  state = {
    title: '',
  }


  handleInput =({ target }) => {
    document.addEventListener('keyup', this.handleKeyup)
    this.setState({ title: target.value });
  }

  handleKeyup =(e) => {
    if (e.code === 'Escape') {
      this.setState({ title: '' });
      document.removeEventListener('keyup', this.handleKeyup);
    }
  }

  reset = () => {
    this.setState({ title: '' });
  }

  sendTodo = (e) => {
    e.preventDefault();

    const { addNewTodo } = this.props;
    const { title } = this.state;

    if (title.trim().length > 0) {
      addNewTodo(title.trim());
      this.reset();
    }
  }

  render() {
    const { title } = this.state;

    return (
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={this.sendTodo}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={title}
            onChange={this.handleInput}
            onBlur={this.sendTodo}
          />
        </form>
      </header>
    );
  }
}

Header.propTypes = {
  addNewTodo: PropTypes.func.isRequired,
};
