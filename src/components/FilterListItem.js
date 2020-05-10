import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const FilterListItem = ({ item, currentFilter, filterCurrentValue }) => (
  <li>
    <a
      href={item.href}
      className={classNames({ selected: item.title === currentFilter })}
      onClick={() => filterCurrentValue(item.title)}
    >
      {item.title}
    </a>
  </li>
);

FilterListItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
  }).isRequired,
  currentFilter: PropTypes.string.isRequired,
  filterCurrentValue: PropTypes.func.isRequired,
};
