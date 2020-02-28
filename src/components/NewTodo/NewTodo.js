import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

export class NewTodo extends React.Component {
  state = {
    title: '',
  }

  handleChange = (event) => {
    const title = event.target.value.replace(/^\s/, '');

    this.setState({
      title,
    });
  }

  handleKeyPress = (event) => {
    const { title } = this.state;

    if (event.key === 'Enter') {
      const todo = {
        id: uuidv4(),
        title,
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
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        name={title}
        value={title}
        onChange={this.handleChange}
        onKeyPress={this.handleKeyPress}

      />
    );
  }
}

NewTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
