import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

export class TodoHeader extends React.Component {
  state = {
    text: '',
  }

  handleChange = (event) => {
    this.setState({
      text: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { text } = this.state;
    const { handleAddTodo } = this.props;

    if (text.trim() !== '') {
      handleAddTodo({
        text,
        completed: true,
        id: uuidv4(),
      });

      this.setState({
        text: '',
      });
    }
  }

  render() {
    const { text } = this.state;

    return (
      <header className="header">
        <h1 className="title">Todos</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.handleChange}
            value={text}
          />
        </form>
      </header>
    );
  }
}

TodoHeader.propTypes = {
  handleAddTodo: PropTypes.func.isRequired,
};
