import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ children }) => (
  <header className="header">
    <h1>todos</h1>
    {children}
  </header>
);

Header.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Header;
