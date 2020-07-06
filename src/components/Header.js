import React from 'react';
import PropTypes from 'prop-types';
import ItemToggleAllCompleted from
  './ItemToggleAllCompleted/ItemToggleAllCompleted';

class Header extends React.Component {
  state = {
    todoText: '',
  }

  onInputChange = (event) => {
    this.setState({
      todoText: event.target.value,
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.addNewTodo(this.state.todoText);
    this.setState({
      todoText: '',
    });
  }

  render() {
    return (
      <header className="header">
        <ItemToggleAllCompleted
          onToggleDoneAll={this.props.onToggleDoneAll}
          todos={this.props.todos}
        />
        <form
          className="item-add-form"
          onSubmit={this.onSubmit}
        >
          <h1>todos</h1>
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.onInputChange}
            value={this.state.todoText}
          />
        </form>
      </header>
    );
  }
}

Header.propTypes = {
  addNewTodo: PropTypes.func.isRequired,
  onToggleDoneAll: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf.isRequired,
};

export default Header;
