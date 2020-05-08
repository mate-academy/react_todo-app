import React from 'react';
import PropTypes from 'prop-types';

class TodoApp extends React.Component {
  state = {
    currentValue: '',
  };

  handleValue = (event) => {
    this.setState({
      currentValue: event.target.value,
    });
  };

  handleAddTodo = (event) => {
    event.preventDefault();

    this.setState({
      currentValue: '',
    });
    this.props.addTodo({
      title: this.state.currentValue,
      id: +new Date(),
      completed: false,
    });
  };

  render() {
    return (
      <form onSubmit={this.handleAddTodo}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={this.state.currentValue}
          onChange={this.handleValue}
        />
      </form>
    );
  }
}

export default TodoApp;

TodoApp.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
