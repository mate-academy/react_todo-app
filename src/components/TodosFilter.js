import React from 'react';
import PropTypes from 'prop-types';
import { FilterItem } from './FilterItem';

const filters = [
  {
    name: 'all', href: '#/', content: 'All',
  },
  {
    name: 'active', href: '#/active', content: 'Active',
  },
  {
    name: 'completed', href: '#/completed', content: 'Completed',
  },
];

export const TodosFilter = (props) => {
  const { activeFilter, onFilterClick } = props;

  return (
    <ul className="filters">
      {filters.map((filter) => {
        const { name, href, content } = filter;

        return (
          <FilterItem
            href={href}
            content={content}
            className={name === activeFilter ? 'selected' : ''}
            onFilterClick={() => onFilterClick(name)}
          />
        );
      })}
    </ul>
  );
};

TodosFilter.propTypes = {
  activeFilter: PropTypes.string.isRequired,
  onFilterClick: PropTypes.func.isRequired,
};
