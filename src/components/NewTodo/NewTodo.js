import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './NewTodo.css';

class NewTodo extends Component {
  state = {
    title: '',
    count: 0,
  };

  handleClick = (event) => {
    event.preventDefault();
    const { title } = event.target;
    const { addTodo } = this.props;

    if (title.value.length === 0) {
      return false;
    }

    const newTodo = {
      title: title.value,
      completed: false,
      id: this.state.count,
    };

    this.setState(prevState => ({
      ...prevState,
      title: '',
      count: prevState.count + 1,
    }));

    addTodo(newTodo);
  };

  handleChange = (event) => {
    this.setState({
      title: event.target.value,
    });
  };

  render() {
    return (
      <form onSubmit={this.handleClick}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.handleChange}
          value={this.state.title}
          name="title"
        />
        <input type="submit" className="enter-submit" />
      </form>
    );
  }
}

NewTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default NewTodo;
