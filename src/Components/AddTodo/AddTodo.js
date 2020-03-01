import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

export class AddTodo extends React.Component {
  state = {
    title: '',
  }

  handleInputChange = ({ target: { value } }) => {
    this.setState({
      title: value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { title } = this.state;
    const { addTodo } = this.props;

    if (title.trim()) {
      addTodo({
        title,
        completed: false,
        id: uuidv4(),
      });
    }

    this.setState({
      title: '',
    });
  }

  render() {
    const { title } = this.state;

    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.handleInputChange}
            value={title}
          />
        </form>
      </header>
    );
  }
}

AddTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
