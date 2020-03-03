import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

export class TodoApp extends React.Component {
  state = {
    title: '',
    id: uuidv4(),
    completed: false,
    edit: false,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { title } = this.state;
    const { addTodo } = this.props;

    if (title) {
      addTodo(this.state);
    }

    this.setState({
      title: '',
      id: uuidv4(),
    });
  };

  handleInput = ({ target }) => {
    const { value } = target;

    this.setState({
      title: value.replace(/\s/g, ''),
    });
  };

  render() {
    const { title } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          onChange={this.handleInput}
          value={title}
          className="new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    );
  }
}

TodoApp.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
