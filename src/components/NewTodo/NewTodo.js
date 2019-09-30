import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NewTodo extends Component {
  state = {
    countNewTodo: 0,
    title: '',
  };

  handleClick = (event) => {
    event.preventDefault();

    const { addTodo } = this.props;
    const { title } = event.target;

    if (title.value.length < 1) {
      return false;
    }

    const newTodo = {
      title: title.value,
      completed: false,
      id: this.state.countNewTodo,
    };

    this.setState(prevState => ({
      ...prevState,
      countNewTodo: prevState.countNewTodo + 1,
      title: '',
    }));

    addTodo(newTodo);
  };

  onChange = (event) => {
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
          onChange={this.onChange}
          value={this.state.title}
          name="title"
        />
      </form>
    );
  }
}

NewTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default NewTodo;
