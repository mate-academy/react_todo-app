import React from 'react';
import PropTypes from 'prop-types';

class TodoInput extends React.Component {
  state = {
    input: '',
  };

  handleAddInputValue = (event) => {
    const { input } = this.state;

    if (event.key === 'Enter' && input) {
      event.preventDefault();
      this.props.addTodo(input);
      this.setState({ input: '' });
    }
  }

  handleInputChange = (event) => {
    const { value } = event.target;

    this.setState({
      input: value.trim(),
    });
  }

  render() {
    const { input } = this.state;

    return (
      <>
        <form>
          <input
            onKeyPress={this.handleAddInputValue}
            onChange={this.handleInputChange}
            value={input}
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
          />
        </form>
      </>
    );
  }
}

TodoInput.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default TodoInput;
