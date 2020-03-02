import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

export class NewTodo extends React.Component {
  state = {
    title: '',
  }

  handleChange = (event) => {
    const { value: title } = event.target;

    this.setState({
      title,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { title } = this.state;

    if (title.length > 0) {
      const todo = {
        id: uuidv4(),
        title: title.trim(),
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
      <form onSubmit={this.handleSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          name={title}
          value={title}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}

NewTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
