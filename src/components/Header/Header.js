import React from 'react';
import { PropTypes } from 'prop-types';

export class Header extends React.Component {
  state = {
    todoName: '',
  }

  onChange = (event) => {
    const { target: { value } } = event;

    this.setState(prevState => ({
      ...prevState,
      todoName: value,
    }));
  };

  onHandleKeydown = (event) => {
    const {
      onSaveInput,
    } = this.props;
    const {
      todoName,
    } = this.state;

    if (event.key === 'Enter') {
      onSaveInput(todoName);
      this.setState(prevState => ({
        ...prevState,
        todoName: '',
      }));
    }
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          type="text"
          className="new-todo"
          value={this.state.todoName}
          placeholder="What needs to be done?"
          onKeyDown={this.onHandleKeydown}
          onChange={this.onChange}
        />
      </header>
    );
  }
}

Header.propTypes = {
  onSaveInput: PropTypes.func.isRequired,
};
