import React from 'react';
import propTypes from 'prop-types';

class AddTodo extends React.Component {
  state = {
    input: '',
    currentId: 1,
  };

  addTask = () => {
    const { input, currentId } = this.state;

    if (input.trim()) {
      this.props.addTask(input, currentId);
      this.setState(prev => ({
        input: '', currentId: prev.currentId + 1,
      }));
    }
  }

  inputChange = event => this.setState({ input: event.target.value });

  handleSubmit = (event) => {
    event.preventDefault();
    this.addTask();
  }

  render() {
    const { input } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={this.inputChange}
          className="new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    );
  }
}

AddTodo.propTypes = {
  addTask: propTypes.func.isRequired,
};

export default AddTodo;
