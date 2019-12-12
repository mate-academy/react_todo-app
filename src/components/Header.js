import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
  state={
    todoValue: '',
  }

  handleType = (event) => {
    this.setState({
      todoValue: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { todoValue } = this.state;
    const { todos, writeNewTodo, isExistingAndUnique } = this.props;

    const newTodo = {
      title: todoValue,
      id: todoValue,
      completed: false,
    };

    if (isExistingAndUnique(todoValue, todos)) {
      writeNewTodo(newTodo);

      this.setState({
        todoValue: '',
      });
    }
  }

  render() {
    const { todoValue } = this.state;

    return (
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={this.handleSubmit}>
          <input
            name="title"
            value={todoValue}
            onChange={this.handleType}
            className="new-todo"
            placeholder="What needs to be done?"
          />
        </form>
      </header>
    );
  }
}

Header.propTypes = {
  writeNewTodo: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  isExistingAndUnique: PropTypes.func.isRequired,
};

export default Header;
