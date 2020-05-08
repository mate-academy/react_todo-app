import React from 'react';
import PropTypes from 'prop-types';
import { filterUtils } from '../utils/FilterUtils';

const TodosFilter = ({ onFilterChange, filter }) => {
  const links = filterUtils.filters.map(({ name, href, label }) => {
    const isActive = filter === name;
    const linkActive = isActive ? 'selected' : '';

    return (
      <li key={name}>
        <a
          href={href}
          onClick={() => onFilterChange(name)}
          className={linkActive}
        >
          {label}
        </a>
      </li>
    );
  });

  return (
    <ul className="filters">
      {links}
    </ul>
  );
};

TodosFilter.propTypes = {
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default TodosFilter;
