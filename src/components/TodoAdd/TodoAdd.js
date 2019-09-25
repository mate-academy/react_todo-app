import React from 'react';

import './TodoAdd.css';

class TodoAdd extends React.Component {
  state = {
    inputValue: '',
  };

  handleOnChange = ({ target }) => {
    const { value } = target;

    this.setState({
      inputValue: value,
    });
  };

  handleAdd = (event) => {
    event.preventDefault();

    const { inputValue } = this.state;
    const { addTodo } = this.props;

    addTodo(inputValue);

    this.setState({
      inputValue: '',
    });
  };

  render() {
    const { inputValue } = this.state;

    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.handleAdd}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.handleOnChange}
            value={inputValue}
          />
        </form>
      </header>
    );
  }
};

export default TodoAdd;
