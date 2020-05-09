import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

export class AddNewTodo extends React.Component {
  state = {
    title: '',
    hasTextError: false,
  }

  handleInputChange = (event) => {
    this.setState({
      hasTextError: false,
      title: event.target.value,
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    const { title } = this.state;

    if (!title) {
      this.setState({
        hasTextError: true,
      });

      return;
    }

    if (!(/^[a-zA-z0-9а-яА-Я\s]+$/).test(title)
        || (/^\s*$/).test(title)) {
      this.setState({
        hasTextError: true,
      });

      return;
    }

    const newTodo = {
      title,
      id: this.props.lastTodoId + 1,
      completed: false,
    };

    this.props.addNewTodo(newTodo);

    this.setState({
      title: '',
    });
  }

  render() {
    const { title, hasTextError } = this.state;

    return (
      <form onSubmit={this.handleFormSubmit}>
        <input
          className={ClassNames('new-todo',
            { 'new-todo--error': hasTextError })}
          onChange={this.handleInputChange}
          type="text"
          value={title}
          placeholder="What needs to be done?"
        />
      </form>
    );
  }
}

AddNewTodo.propTypes = {
  addNewTodo: PropTypes.func.isRequired,
  lastTodoId: PropTypes.number.isRequired,
};
