import React from 'react';

class AddTodo extends React.Component {
  state = {
    text: '',
    errorsList: '',
  }

  handleTodoInput = (event) => {
    this.setState({
     text: event.target.value,
     errorsList: false,
    });
  };

  handleTodoAdd = (event) => {
    const {handleTodoAdd} = this.props
    let {errorsList} = this.state;
    if (event.key === 'Enter') {
      event.preventDefault();
      this.setState ((prevState => {
        if (!prevState.text) {
          errorsList = true;
        }
        if (errorsList) {
          return { errorsList };
        }
      handleTodoAdd({
        text: this.state.text,
        id: Date.now(),
        completed: false,
      });
    }))
      this.resetState();
    }
   };

  resetState() {
    this.setState({
      text: '',

    });
  };

  render () {
    const { errorsList } = this.state;
    return (
      <form>
        <input
          className="new-todo"
          placeholder={ errorsList
            ? "Enter the todo first"
            : "What needs to be done?" }
          value={this.state.text}
          onChange={this.handleTodoInput}
          onKeyPress={this.handleTodoAdd}
        />
      </form>
    )
  };
}

export default AddTodo;
