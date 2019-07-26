import React from 'react';
import PropTypes from 'prop-types';

class TodoApp extends React.Component {
  state = {
    title: '',
  }

  handleSubmit = (event) => {
    const { addNewTodo } = this.props;

    event.preventDefault();

    this.setState((prevState) => {
      addNewTodo({
        title: prevState.title,
        completed: false,
        id: Date.now(),
      });

      return {
        title: '',
      };
    });
  };

  handleChange = (event) => {
    const { value } = event.target;

    this.setState({
      title: value,
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.handleChange}
          value={this.state.title}
        />
      </form>
    );
  }
}

TodoApp.propTypes = {
  addNewTodo: PropTypes.func.isRequired,
};

export default TodoApp;
