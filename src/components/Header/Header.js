import React from 'react';
import { connect } from 'react-redux';

import { addTodo } from '../../redux/todos';
import { headerPropTypes } from '../../propTypes/propTypes';

class Header extends React.Component {
  state = {
    inputValue: '',
  };

  handleInput = (e) => {
    const { value } = e.target;

    this.setState({
      inputValue: value,
    });
  };

  handleSubmit = (e) => {
    const inputValue = this.state.inputValue.trim();

    if (e.key === 'Enter' && inputValue) {
      this.props.addTodo(inputValue);
      this.setState({
        inputValue: '',
      });
    }
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>

        <input
          onKeyDown={this.handleSubmit}
          onChange={this.handleInput}
          className="new-todo"
          placeholder="What needs to be done?"
          value={this.state.inputValue}
        />
      </header>
    );
  }
}

const mapActions = {
  addTodo,
};

export default connect(null, mapActions)(Header);

Header.propTypes = headerPropTypes;
