import React, { Component } from 'react';

class Header extends Component {
  render() {
    const { changeInput, addItem, value } = this.props;

    return (
      <header className="header">
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          type="text"
          onChange={changeInput}
          onKeyDown={addItem}
          value={value}
        />
      </header>
    );
  }
}

export default Header;
