import React from 'react';

class Input extends React.Component {
  state = {
    title: '',
  };

  handleTitleChange = (event) => {
    this.setState({
      title: event.target.value,
    });
  };

  addTodo = (e) => {
    if (this.state.title !== '' && (e.which === 13 || e.keyCode === 13)) {
      this.props.addTodoItem(this.state.title);
      this.setState({
        title: '',
      });
    }
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.handleTitleChange}
          onKeyPress={this.addTodo}
          value={this.state.title}
        />
      </header>
    );
  }
}

export default Input;
