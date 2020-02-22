import React from 'react';
import PropTypes from 'prop-types';
import { KEYCODE } from '../utils/const';

export class NewTodo extends React.PureComponent {
  state = {
    inputValue: '',
  };

  handleInputChange = (evt) => {
    this.setState({ inputValue: evt.target.value });
  };

  handleInputKeyDown = (evt) => {
    const { inputValue } = this.state;
    const { onKeyDown } = this.props;

    if (evt.keyCode === KEYCODE.ENTER) {
      onKeyDown(inputValue);

      this.setState({ inputValue: '' });
    }
  };

  render() {
    const { inputValue } = this.state;

    return (
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        value={inputValue}
        onChange={this.handleInputChange}
        onKeyDown={this.handleInputKeyDown}
      />
    );
  }
}

NewTodo.propTypes = {
  onKeyDown: PropTypes.func.isRequired,
};
