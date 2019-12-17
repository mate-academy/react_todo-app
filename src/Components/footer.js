import React from 'react';
import PropTypes from 'prop-types';
import Filters from './filters';

// eslint-disable-next-line react/prop-types
const Footer = ({ filters, list, clearCompleted, setFilter }) => (
  <Filters
    filters={filters}
    list={list}
    clearCompleted={clearCompleted}
    setFilter={setFilter}

  />
);

Footer.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object),
};

Footer.defaultProps = {
  list: [],
};

export default Footer;
