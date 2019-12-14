import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
  state = {
    inputValue: '',
  }

  addInputValue = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.state.inputValue) {
      return;
    }

    const newTodo = {
      title: this.state.inputValue,
      id: +new Date(),
      completed: false,
    };

    this.props.addTodo(newTodo);
    this.setState({
      inputValue: '',
    });
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.addInputValue}
            value={this.state.inputValue}
          />
        </form>
      </header>
    );
  }
}

Header.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default Header;
