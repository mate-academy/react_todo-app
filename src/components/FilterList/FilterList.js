import React from 'react';
import PropTypes from 'prop-types';
import './FilterList.scss';
import { FilterListItem } from '../FilterListItem/FilterListItem';

export const FilterList = ({ filterComponents, listItems, currentFilter }) => (
  <ul className="filters">
    {listItems.map(item => (
      <FilterListItem
        item={item}
        filterComponents={filterComponents}
        key={item.title}
        currentFilter={currentFilter}
      />
    ))}
  </ul>
);

FilterList.propTypes = {
  filterComponents: PropTypes.func.isRequired,
  listItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentFilter: PropTypes.string.isRequired,
};
