import React from 'react';
import PropTypes from 'prop-types';

import Stats from '../Stats/Stats';
import Stopwatch from '../Stopwatch/Stopwatch';

import './Header.css';

const Header = ({ todos }) => (
  <header className="header">
    <Stats todos={todos} />
    <h1>TODOS</h1>
    <Stopwatch />
  </header>
);

Header.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
};

export default Header;
