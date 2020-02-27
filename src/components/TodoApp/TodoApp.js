import React from 'react';
import uuid from 'uuid/v4';
import PropTypes from 'prop-types';

export class TodoApp extends React.Component {
  state = {
    title: '',
  }

  handleChange = (event) => {
    this.setState({
      title: event.target.value,
    });
  }

  handleKeyPress = (event) => {
    const { title } = this.state;

    if (event.key === 'Enter') {
      const newTask = {
        title,
        id: uuid(),
        completed: false,
      };

      this.props.addNewTodo(newTask);

      this.setState({
        title: '',
      });
    }
  }

  render() {
    const { title } = this.state;

    return (
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={this.handleChange}
        onKeyPress={this.handleKeyPress}
      />
    );
  }
}

TodoApp.propTypes = {
  addNewTodo: PropTypes.func.isRequired,
};
