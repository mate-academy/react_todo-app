import React from 'react';
import PropTypes from 'prop-types';

import SearchPanel from './SearchPanel';
import NewTodo from './NewTodo';

const Header = ({ onSearch, onItemAdded }) => (
  <header className="header">

    <SearchPanel onSearch={onSearch} />

    <h1 className="header-title" style={{ userSelect: 'none' }}>todos</h1>

    <NewTodo onItemAdded={onItemAdded} />
  </header>
);

Header.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onItemAdded: PropTypes.func.isRequired,
};

export default Header;
