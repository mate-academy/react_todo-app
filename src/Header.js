import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
  state = {
    inputValue: '',
  };

  handleInputValue = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { inputValue } = this.state;
    const { add } = this.props;

    add(inputValue);
    this.setState({
      inputValue: '',
    });
  };

  render() {
    const { inputValue } = this.state;

    return (
      <header className="header">
        <form onSubmit={this.onSubmit}>
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={inputValue}
            onChange={this.handleInputValue}
          />
        </form>
      </header>
    );
  }
}

Header.propTypes = { add: PropTypes.func.isRequired };

export default Header;
