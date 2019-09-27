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
    const spaceBarRule = /\s/g;

    if (title.replace(spaceBarRule, '')) {
      const {
        addNewTodo,
      } = this.props;

      addNewTodo({
        title: this.state.title.trim(),
        completed: false,
      });
    }

    this.setState({ title: '' });
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
};

export default NewTodo;
