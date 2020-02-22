import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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
            key={name}
            href={href}
            content={content}
            className={classNames({ selected: name === activeFilter })}
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
