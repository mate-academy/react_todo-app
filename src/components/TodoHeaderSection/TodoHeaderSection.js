import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TodoHeaderSection extends Component {
  state = {
    title: '',
  };

  setTitle = (event) => {
    const title = event.target.value;

    this.setState({
      title,
    });
  };

  validateForm = (event) => {
    event.preventDefault();
    const { addTodo } = this.props;

    this.setState((state) => {
      if (state.title.trim() === '') {
        return '';
      }

      addTodo({
        id: +new Date(),
        title: state.title,
        completed: false,
      });

      return {
        title: '',
      };
    });
  };

  render = () => {
    const { title } = this.state;

    return (
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={this.validateForm}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            type="text"
            onChange={this.setTitle}
            value={title}
          />
        </form>
      </header>
    );
  };
}

TodoHeaderSection.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
