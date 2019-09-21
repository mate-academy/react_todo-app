import React from 'react';

class NewTodo extends React.Component {
  state = {
    inputNewTodoValue: '',
  }

  addTodo = (event) => {
    const { addTodoToData } = this.props;
    const { inputNewTodoValue } = this.state;

    event.preventDefault();
    
    if (inputNewTodoValue) {
      addTodoToData(inputNewTodoValue);
      this.setState({
        inputNewTodoValue: '',
      });
    }
  }

  onchangeInputNewTodo = ({ target: { value } }) => {
    this.setState({
      inputNewTodoValue: value,
    });
  }

  render() {
    const { inputNewTodoValue } = this.state;


    return (
      <form onSubmit={this.addTodo}>
        <input
          value={inputNewTodoValue}
          onChange={this.onchangeInputNewTodo}
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
        />
      </form>
    );
  }
}

export default NewTodo;
