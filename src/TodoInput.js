import React from 'react';
import PropTypes from 'prop-types';

class TodoInput extends React.Component {
  state = {
    inputValue: '',
  }

  handleInputChange = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  }

  handleOnSubmit = (event) => {
    event.preventDefault();

    const title = this.state.inputValue.trim();

    if (!title) {
      return;
    }

    this.props.addTodo(title);

    this.setState({
      inputValue: '',
    });
  }

  render() {
    return (
      <form onSubmit={this.handleOnSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={this.state.inputValue}
          onChange={this.handleInputChange}
        />
      </form>
    );
  }
}

TodoInput.propTypes = { addTodo: PropTypes.func.isRequired };

export default TodoInput;
