import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
  state = {
    inputText: '',
  };

  handleInputText = (event) => {
    this.setState({
      inputText: event.target.value,
    });
  };

  handleInputSubmit = (event) => {
    event.preventDefault();
    const { inputText } = this.state;
    const { addTodo } = this.props;

    addTodo(inputText);
    this.setState({
      inputText: '',
    });
  };

  render() {
    const { inputText } = this.state;

    return (
      <header className="header">
        <form
          onSubmit={this.handleInputSubmit}
        >
          <h1>todos</h1>

          <input
            value={inputText}
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.handleInputText}
          />
        </form>
      </header>
    );
  }
}

Header.propTypes
  = { addTodo: PropTypes.func.isRequired };

export default Header;
