import React from 'react';

class AddTodo extends React.Component {
  state = {
    text: '',
  }

  handleTodoInput = (event) => {
    this.setState({
     text: event.target.value,
    });
  };

  handleTodoAdd = (event) => {
    const {handleTodoAdd} = this.props
    if(event.key === 'Enter'){
      handleTodoAdd({
        text: this.state.text,
        id: Date.now(),
      });
      this.resetState();
    }
   }

  resetState() {
    this.setState({
      text: ''
    });
  }

  render () {
    return (
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={this.state.text}
        onChange={this.handleTodoInput}
        onKeyPress={this.handleTodoAdd}
      />
    )
  }
}

export default AddTodo;
