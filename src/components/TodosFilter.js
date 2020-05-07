import React from 'react';
import PropTypes from 'prop-types';

const linksList = [
  {
    name: 'all', label: 'All',
  },
  {
    name: 'active', label: 'Active',
  },
  {
    name: 'completed', label: 'Completed',
  },
];

const TodosFilter = ({ onFilterChange, filter }) => {
  const links = linksList.map(({ name, label }) => {
    const isActive = filter === name;
    const linkActive = isActive ? 'selected' : '';

    return (
      <li key={name}>
        <a
          href={`#/${name}`}
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
