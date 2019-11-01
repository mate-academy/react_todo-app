import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TodoApp.css';

const uuidv1 = require('uuid/v1');

class TodoApp extends Component {
  state = {
    title: '',
    error: null,
  };

  handleInputChange = ({ target }) => {
    this.setState({
      title: target.value,
      error: null,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { addTodo } = this.props;
    const { newTodo } = event.target;

    if (!newTodo.value) {
      this.setState({
        error: 'Enter todo',
      });
    } else {
      const todo = {
        title: newTodo.value,
        id: uuidv1(),
        completed: false,
      };

      this.setState(prevState => ({
        ...prevState,
        title: '',
      }));
      addTodo(todo);
    }
  };

  render() {
    const { error } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name="newTodo"
          id="newTodo"
          placeholder="What you need to do?"
          className="new-todo"
          value={this.state.title}
          onChange={this.handleInputChange}
        />
        {error && (
          <p>{error}</p>
        )}
        <input type="submit" className="submit" />
      </form>
    );
  }
}

TodoApp.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default TodoApp;
