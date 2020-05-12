import React from 'react';
import PropTypes from 'prop-types';

export class TodoApp extends React.Component {
  state ={
    title: '',
  }

  handleInputChange = (event) => {
    this.setState({
      title: event.target.value,
    });
  }

  handleReset = () => {
    this.setState({
      title: '',
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { addNewTodo } = this.props;
    const { title } = this.state;

    if (!title.trim()) {
      this.setState({
        title: '',
      });

      return;
    }

    const newTodo = {
      title,
      id: +new Date(),
      completed: false,
    };

    addNewTodo(newTodo);

    this.handleReset();
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
            value={title}
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}

TodoApp.propTypes = {
  addNewTodo: PropTypes.func.isRequired,
};
