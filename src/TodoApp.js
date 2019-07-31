import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

class TodoApp extends React.Component {
  state = {
    title: '',
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { onSubmit } = this.props;

    onSubmit(this.state.title);

    this.setState({
      title: '',
    });
  }

    handleChange = (event) => {
      const { name, value } = event.target;

      this.setState({
        [name]: value,
      });
    }

    render() {
      return (
        <header className="header">
          <h1>todos</h1>
          <form onSubmit={this.handleSubmit}>
            <label
              className="new-todo"
              htmlFor="new-todo-title"
            >
              <input
                className="new-todo"
                placeholder="What needs to be done?"
                onChange={this.handleChange}
                value={this.state.title}
                name="title"
                type="text"
              />
            </label>
            <button
              type="submit"
              className="buttonHide"
            >
          submit
            </button>
          </form>
        </header>
      );
    }
}

TodoApp.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default TodoApp;
