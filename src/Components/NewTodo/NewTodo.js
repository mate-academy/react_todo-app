import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NewTodo extends Component {
  state = {
    title: '',
  }

  handleChangeTitle = (event) => {
    const { value } = event.target;

    this.setState({ title: value });
  }

  handleSubmitTitle = (event) => {
    event.preventDefault();
    const { title } = this.state;

    if (title) {
      const {
        addNewTodo,
        todoListLength,
      } = this.props;

      addNewTodo({
        id: todoListLength + 1,
        title: this.state.title,
        completed: false,
      });
      this.setState({ title: '' });
    }
  }

  render() {
    const { title } = this.state;

    return (
      <form onSubmit={this.handleSubmitTitle}>
        <input
          value={title}
          onChange={this.handleChangeTitle}
          className="new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    );
  }
}

NewTodo.propTypes = {
  addNewTodo: PropTypes.func.isRequired,
  todoListLength: PropTypes.number.isRequired,
};

export default NewTodo;
