import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NewTodo extends Component {
  state = {
    value: '',
  }

  handleInputChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  }

  handleSubmitNewTodo = (e) => {
    e.preventDefault();
    this.props.addNewTodo(this.state.value);
    this.setState({
      value: '',
    });
  }

  render() {
    const { value } = this.state;

    return (
      <form onSubmit={this.handleSubmitNewTodo}>
        <input
          value={value}
          onChange={this.handleInputChange}
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
