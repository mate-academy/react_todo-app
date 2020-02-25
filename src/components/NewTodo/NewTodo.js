import React from 'react';
import PropTypes from 'prop-types';

export class NewTodo extends React.Component {
  state = {
    tempTitle: '',
  }

  changeHandler = (event) => {
    this.setState({
      tempTitle: event.target.value,
    });
  }

  onBlurInput = () => {
    const title = this.state.tempTitle.trim();

    if (title !== '') {
      this.props.onNewTodo(title);
    }

    this.setState({
      tempTitle: '',
    });
  }

  onEscape = (event) => {
    const { keyCode } = event;

    if (keyCode === 27) {
      this.setState({
        tempTitle: '',
      });
    }
  }

  onKeyInput = (event) => {
    const { key, target } = event;

    if (key === 'Enter') {
      const title = this.state.tempTitle.trim();

      if (title !== '') {
        this.setState({
          tempTitle: '',
        });
        target.value = '';
        this.props.onNewTodo(title);
      } else {
        this.setState({
          tempTitle: '',
        });
      }
    }
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.changeHandler}
          onBlur={this.onBlurInput}
          onKeyPress={this.onKeyInput}
          onKeyDown={this.onEscape}
          value={this.state.tempTitle}
        />
      </header>
    );
  }
}

NewTodo.propTypes = {
  onNewTodo: PropTypes.func.isRequired,
};
