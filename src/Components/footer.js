import React from 'react';
import PropTypes from 'prop-types';
import Filters from './filters';

const Footer
  = ({ filters, list, clearCompleted, filterTabs, lengthFilteredTodos }) => (
    <Filters
      filters={filters}
      list={list}
      clearCompleted={clearCompleted}
      filterTabs={filterTabs}
      lengthFilteredTodos={lengthFilteredTodos}
    />
  );

Footer.propTypes = {
  filters: PropTypes.objectOf(PropTypes.string),
  list: PropTypes.arrayOf(PropTypes.object),
  clearCompleted: PropTypes.func.isRequired,
  filterTabs: PropTypes.func.isRequired,
  lengthFilteredTodos: PropTypes.number,
};

Footer.defaultProps = {
  filters: [],
  list: [],
  lengthFilteredTodos: null,
};

export default Footer;
