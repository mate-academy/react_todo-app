import React from 'react';
import PropTypes from 'prop-types';
import Filters from './filters';

const Footer = ({ filters, list, clearCompleted, filterTabs }) => (
  <Filters
    filters={filters}
    list={list}
    clearCompleted={clearCompleted}
    filterTabs={filterTabs}
  />
);

Footer.propTypes = {
  filters: PropTypes.objectOf(PropTypes.string),
  list: PropTypes.arrayOf(PropTypes.object),
  clearCompleted: PropTypes.func.isRequired,
  filterTabs: PropTypes.func.isRequired,
};

Footer.defaultProps = {
  filters: [],
  list: [],
};

export default Footer;
