/* eslint-disable */
import React from 'react';

class NewToDo extends React.Component {
  state = {
    inputValue: '',
  };

  disableReload = (event) => {
    event.preventDefault();
  };

  inputChange = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  };
  
  handleButtonClick = () => {
    if (this.state.inputValue.length > 0) {
      const todo = {
        title: this.state.inputValue,
        completed: false,
      };
  
      this.props.addTodo(todo);
      this.setState({
        inputValue: '',
      })
    }
  };

  render() {
    return (
      <form onSubmit={this.disableReload}>
        <input
          onChange={this.inputChange}
          className="new-todo"
          placeholder="What needs to be done?"
          value={this.state.inputValue}
        />
        <button
          type="submit"
          style={{ display: 'hidden' }}
          onClick={this.handleButtonClick}
        />
      </form>
    );
  }
}

export default NewToDo;
