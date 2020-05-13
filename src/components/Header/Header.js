import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
  state = {
    currentValue: '',
  };

  handleValue = (event) => {
    this.setState({
      currentValue: event.target.value,
    });
  };

  handleAddTodo = (event) => {
    event.preventDefault();

    this.setState({
      currentValue: '',
    });

    if (this.state.currentValue.split(' ').join('')) {
      this.props.addTodo({
        title: this.state.currentValue,
        id: +new Date(),
        completed: false,
      });
    }
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={this.handleAddTodo}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={this.state.currentValue}
            onChange={this.handleValue}
          />
        </form>
      </header>
    );
  }
}

export default Header;

Header.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
