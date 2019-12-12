import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
  clickHandle = (event) => {
    if (event.key && event.key !== 'Enter') {
      return null;
    }

    const { target } = event;

    if (!target.value) {
      return null;
    }

    this.props.addTask(target);
    return 0;
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          onKeyPress={this.clickHandle}
          onBlur={this.clickHandle}
        />
      </header>
    );
  }
}

Header.propTypes = {
  addTask: PropTypes.func.isRequired,
};

export default Header;
