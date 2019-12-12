import React from 'react';
import PropTypes from 'prop-types';

class NewTodo extends React.Component {
  state = {
    inputValue: '',
  };

  handleInput = ({ target }) => (
    this.setState({
      inputValue: target.value,
    })
  );

  handleEnterDown = (e) => {
    const { inputValue } = this.state;

    if (e.key === 'Enter' && inputValue) {
      this.props.addNewTodo(inputValue);
      this.setState({ inputValue: '' });
    }
  };

  render() {
    const { inputValue } = this.state;

    return (
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        onChange={this.handleInput}
        onKeyDown={this.handleEnterDown}
        value={inputValue}
      />
    );
  }
}

export default NewTodo;

NewTodo.propTypes = {
  addNewTodo: PropTypes.func.isRequired,
};
