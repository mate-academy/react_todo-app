import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CN from 'classnames';

export class Header extends Component {
  state = {
    title: '',
    errorTitle: false,
  };

  handleChangeTitle = ({ target }) => {
    this.setState({
      title: target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const newTitle = this.state.title.trim();

    if (!newTitle) {
      this.setState({
        errorTitle: true,
      });
      this.resetInput();

      return;
    }

    // не знаю как для пропсов проптайп написать
    const currentId = this.props.id;

    this.props.newTodo(newTitle, currentId);
    this.setState({
      errorTitle: false,
    });
    this.resetInput();
  };

  resetInput = () => {
    this.setState({
      title: '',
    });
  };

  render() {
    const { title, errorTitle } = this.state;

    return (
      <header className="header">
        <h1>todos</h1>
        <form action="" onSubmit={this.handleSubmit}>
          <label htmlFor="new-todo">
            <input
              className={CN({
                'new-todo new-todo-error': errorTitle,
                'new-todo': !errorTitle,
              })}
              name="new-todo"
              placeholder={errorTitle
                ? ('введи хоть чет')
                : ('What needs to be done?')}
              value={title}
              onChange={this.handleChangeTitle}
            />
          </label>
        </form>
      </header>
    );
  }
}

Header.propTypes = {
  id: PropTypes.number.isRequired,
  newTodo: PropTypes.func.isRequired,
};
