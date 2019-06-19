import React, { Component } from 'react';

class Header extends Component {
  state = {
    todo: '',
  };

  changeTodo = todo => {
    this.setState({ todo });
  };

  addTodo = event => {
    event.preventDefault();
    const { addTodo } = this.props;
    const { todo } = this.state;
    if (todo === '') {
      return;
    }
    addTodo(todo);
    this.setState({ todo: '' });
  };

  render() {
    const { todo } = this.state;
    return (
      <header className="header">
        <h1>Todos</h1>
        <form onSubmit={event => this.addTodo(event)}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus=""
            value={todo}
            onChange={event => this.changeTodo(event.target.value)}
          />
        </form>
      </header>
    );
  }
}

export default Header;
