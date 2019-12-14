import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ submitForm, change, value }) => (
  <header className="header">
    <h1>todos App</h1>
    <form onSubmit={submitForm}>
      <input
        onChange={change}
        value={value}
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus=""
      />
      </form>
  </header>
)

Header.propTypes = { 
  submitForm: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired
};

export default Header;
