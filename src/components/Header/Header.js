import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextInput } from '../Form';

export class Header extends Component {
  state = {
    title: '',
  }


  handleInputChange =({ target }) => {
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
      document.removeEventListener('keyup', this.handleKeyup);
    }
  }

  render() {
    const { title } = this.state;

    return (
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={this.sendTodo}>
          <TextInput 
            className="new-todo"
            id="new-todo"
            name="new-todo"
            value={title}
            handleChange={this.handleInputChange}
            handleBlur={this.sendTodo}
          />
        </form>
      </header>
    );
  }
}

Header.propTypes = {
  addNewTodo: PropTypes.func.isRequired,
};
