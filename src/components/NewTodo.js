import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

export class NewTodo extends React.Component {
  state = {
    title: '',
  }

  handleChangeInput = ({ target: { value } }) => {
    this.setState({
      title: value.replace(/^\s/, ''),
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { addNewTodo } = this.props;
    const { title } = this.state;

    addNewTodo({
      title,
      id: uuidv4(),
      completed: false,
    });

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
            value={title}
            placeholder="What needs to be done?"
            onChange={this.handleChangeInput}
          />
        </form>
      </header>
    );
  }
}

NewTodo.propTypes = {
  addNewTodo: PropTypes.func.isRequired,
};
