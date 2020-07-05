import React from 'react';
import PropTypes from 'prop-types';

class NewTodo extends React.PureComponent {
  state = {
    inputValue: '',
  }

  changeInputValue = (evt) => {
    this.setState({
      inputValue: evt.target.value,
    });
  }

  onEnter = (evt) => {
    if (evt.key === 'Enter') {
      this.props.createTodo(this.state.inputValue);

      this.setState({
        inputValue: '',
      });
    }
  }

  render() {
    return (
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={this.state.inputValue}
        onChange={this.changeInputValue}
        onKeyDown={this.onEnter}
      />
    );
  }
}

export default NewTodo;

NewTodo.propTypes = {
  createTodo: PropTypes.func.isRequired,
};
