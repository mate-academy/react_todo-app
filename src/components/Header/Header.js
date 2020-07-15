import React from 'react';
import PropTypes from 'prop-types';

import NewTodo from '../NewTodo/NewTodo';

const Header = ({ createTodo }) => (
  <header className="header">
    <h1>todos</h1>

    <NewTodo createTodo={createTodo} />
  </header>
);

export default Header;

Header.propTypes = {
  createTodo: PropTypes.func.isRequired,
};
