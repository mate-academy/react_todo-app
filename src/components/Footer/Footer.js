import React from 'react';
import PropTypes from 'prop-types';

import TodoCount from '../TodoCount/TodoCount';
import Filters from '../Filters/Filters';
import ClearCompleted from '../ClearCompleted/ClearCompleted';

const Footer = ({ uncompletedLength, changeFilter, clearCompleted }) => (
  <footer className="footer">
    <TodoCount uncompletedLength={uncompletedLength} />

    <Filters changeFilter={changeFilter} />

    <ClearCompleted clearCompleted={clearCompleted} />
  </footer>
);

export default Footer;

Footer.propTypes = {
  uncompletedLength: PropTypes.number.isRequired,
  changeFilter: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
};
