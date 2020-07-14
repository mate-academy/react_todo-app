import React from 'react';
import PropTypes from 'prop-types';
import { uuid } from 'uuidv4';

export class NewTodo extends React.Component {
  state = {
    todoTitle: '',
  }

  handleChange = (event) => {
    this.setState({
      todoTitle: event.target.value,
    });
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      const { addNewTodo } = this.props;
      const todoId = uuid();

      if (this.state.todoTitle.replace(/\s+/g, '').length !== 0) {
        addNewTodo({
          id: todoId,
          title: this.state.todoTitle,
          completed: false,
        });

        this.setState({
          todoTitle: '',
        });
      }
    }
  }

  render() {
    return (
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        value={this.state.todoTitle}
        onChange={event => this.handleChange(event)}
        onKeyPress={event => this.handleKeyPress(event)}
      />
    );
  }
}

NewTodo.propTypes = {
  addNewTodo: PropTypes.func.isRequired,
};
