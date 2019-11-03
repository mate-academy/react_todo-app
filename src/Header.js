import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
  state = {
    value: '',
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addTask(this.state.value);
    this.setState({
      value: '',
    });
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.handleSubmit}>

          <input
            className="new-todo"
            onChange={this.handleChange}
            value={this.state.value}
            placeholder="What needs to be done?"
          />

          <button type="submit" className="input-button" />
        </form>
      </header>
    );
  }
}

Header.propTypes = {
  addTask: PropTypes.func,
};

Header.defaultProps = {
  addTask: '',
};

export default Header;
