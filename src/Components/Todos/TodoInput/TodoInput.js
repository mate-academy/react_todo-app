/* eslint-disable react/prop-types */
import React from 'react';

class TodoInput extends React.Component {
  state = {
    input: '',
  };

  handleAddInputValue = (event) => {
    const { input } = this.state;

    if (event.key === 'Enter' && input) {
      this.props.addTodo(input);
      this.setState({ input: '' });
    }
  }

  handleInputChange = (event) => {
    this.setState({
      input: event.target.value,
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

export default TodoInput;
