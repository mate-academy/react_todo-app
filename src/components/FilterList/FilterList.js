import React from 'react';
import PropTypes from 'prop-types';
import './FilterList.scss';
import { FilterListItem } from '../FilterListItem/FilterListItem';

export const FilterList = (
  {
    listItems,
    currentFilter,
    filterCurrentValue,
  },
) => (
  <ul className="filters">
    {listItems.map(item => (
      <FilterListItem
        item={item}
        key={item.title}
        filterCurrentValue={filterCurrentValue}
        currentFilter={currentFilter}
      />
    ))}
  </ul>
);

FilterList.propTypes = {
  filterCurrentValue: PropTypes.func.isRequired,
  listItems: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    href: PropTypes.string,
  })).isRequired,
  currentFilter: PropTypes.string.isRequired,
};
