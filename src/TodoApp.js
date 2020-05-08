import React from 'react';
import PropTypes from 'prop-types';

class TodoApp extends React.Component {
  state = {
    text: '',
  }

  handlTitleChange = (event) => {
    this.setState({
      text: event.target.value.trim(),
    });
  }

  handlFormSubmit = (event) => {
    event.preventDefault();

    this.setState((state) => {
      const newTodo = {
        text: state.text,
        id: +new Date(),
        completed: '',
      };

      this.props.addTodo(newTodo);

      return {
        text: '',
        id: 0,
        completed: false,
      };
    });
  }

  render() {
    return (
      <header className="header">
        <h1>todo</h1>
        <form onSubmit={this.handlFormSubmit}>
          <input
            type="text"
            value={this.state.text}
            onChange={this.handlTitleChange}
            className="new-todo"
            placeholder="What needs to be done?"
          />
        </form>
      </header>

    );
  }
}

TodoApp.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default TodoApp;
