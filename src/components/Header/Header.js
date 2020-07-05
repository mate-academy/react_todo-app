import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
  state = {
    value: '',
  };

  handleAddTodo = (event) => {
    if (event.key === 'Enter' && event.target.value) {
      this.setState((prevState) => {
        this.props.onAddTodo(prevState.value);

        return ({
          value: '',
        });
      });
    }
  };

  handleOnChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>

        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={this.state.value}
          onKeyDown={this.handleAddTodo}
          onChange={this.handleOnChange}
        />
      </header>
    );
  }
}

export { Header };

Header.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
};
