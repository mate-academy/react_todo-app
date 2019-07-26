import React from 'react';
import PropTypes from 'prop-types';

import NewTodo from './NewTodo';

const Header = ({ onItemAdded }) => (
  <header className="header">

    <h1 className="header-title" style={{ userSelect: 'none' }}>todos</h1>

    <NewTodo onItemAdded={onItemAdded} />
  </header>
);

Header.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
};

export default Header;
