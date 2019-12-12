import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

const TodoFilter = ({ filter, setFilter, isFilterSelect }) => (
  <li>
    <a
      onClick={() => setFilter(filter)}
      href="#/"
      className={cn({ selected: isFilterSelect })}
    >
      {filter}
    </a>
  </li>
);

TodoFilter.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
  isFilterSelect: PropTypes.bool.isRequired,
};

export default TodoFilter;
