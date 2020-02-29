import React from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';

export class CreateNewTodo extends React.Component {
  state = {
    title: '',
  }

  handleInputChange = ({ target }) => {
    const { value } = target;

    this.setState({
      title: value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { title } = this.state;
    const { addTodo } = this.props;

    if (title.length > 0) {
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
            onKeyUp={this.handleSubmitEnter}
            value={title}
          />
        </form>
      </header>
    );
  }
}

CreateNewTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
