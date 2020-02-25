import React from 'react';
import PropTypes from 'prop-types';
import { KEYCODE } from '../utils/const';

export class NewTodo extends React.PureComponent {
  state = {
    inputValue: '',
  };

  handleGlobalClick = (event) => {
    if (event.target.closest('.js-new-todo')) {
      return;
    }

    window.removeEventListener('click', this.handleGlobalClick);

    const { inputValue } = this.state;
    const { onKeyDown } = this.props;

    if (inputValue !== '') {
      onKeyDown(inputValue);

      this.setState({
        inputValue: '',
      });
    }
  };

  handleInputChange = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  };

  handleInputKeyDown = (event) => {
    const { inputValue } = this.state;
    const { onKeyDown } = this.props;

    if (event.keyCode === KEYCODE.ENTER && inputValue !== '') {
      onKeyDown(inputValue);

      this.setState({
        inputValue: '',
      });
    }
  };

  handleInputFocus = () => {
    window.addEventListener('click', this.handleGlobalClick);
  };

  render() {
    const { inputValue } = this.state;

    return (
      <input
        type="text"
        className="new-todo js-new-todo"
        placeholder="What needs to be done?"
        value={inputValue}
        onChange={this.handleInputChange}
        onKeyDown={this.handleInputKeyDown}
        onFocus={this.handleInputFocus}
      />
    );
  }
}

NewTodo.propTypes = {
  onKeyDown: PropTypes.func.isRequired,
};
