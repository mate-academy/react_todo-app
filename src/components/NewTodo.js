import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NewTodo extends Component {
  state = {
    title: '',
  }

  handleChangeInput = (evt) => {
    this.setState({
      title: evt.target.value,
    });
  }

  getRandom = () => (1 + Math.random());

  handleSubmitTodo = (evt) => {
    evt.preventDefault();

    if (this.state.title !== '') {
      const todo = {
        id: `${this.getRandom()}`,
        title: this.state.title.trim(),
        completed: false,
      };

      this.props.addTodo(todo);

      this.setState({
        title: '',
      });
    }
  }

  render() {
    const { title } = this.state;

    return (
      <form onSubmit={this.handleSubmitTodo}>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          name={title}
          value={title}
          onChange={this.handleChangeInput}
        />
      </form>
    );
  }
}

NewTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default NewTodo;
