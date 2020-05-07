import React from 'react';
import PropTypes from 'prop-types';
import './FilterListItem.scss';
import classNames from 'classnames';

export const FilterListItem = ({ item, currentFilter, filterComponents }) => (
  <li>
    <a
      href={item.href}
      className={classNames({ selected: item.title === currentFilter })}
      onClick={e => filterComponents(e, item.title)}
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
  filterComponents: PropTypes.func.isRequired,
};
