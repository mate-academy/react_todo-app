import React from 'react';
import PropTypes from 'prop-types';

class NewTodo extends React.Component {
  state = {
    inputValue: '',
  };

  handleChange = (e) => {
    this.setState({
      inputValue: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addNewTodo(this.state.inputValue);

    this.setState({
      inputValue: '',
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          value={this.state.inputValue}
          onChange={this.handleChange}
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
