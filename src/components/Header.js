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

  isExistingAndUnique = (value, arr) => {
    if (value && !arr.some(item => item.title === value)) {
      return true;
    }
    return false;
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const todoObj = {
      title: this.state.todoValue,
      id: this.state.todoValue,
      completed: false,
    };

    this.setState((prevState) => {
      if (this.isExistingAndUnique(
        prevState.todoValue,
        this.props.todoItemsArr
      )) {
        this.props.writeNewTodo(todoObj);

        return ({
          todoValue: '',
        });
      }
      return ({
        todoValue: prevState.todoValue,
      });
    });
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
  todoItemsArr: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Header;
