import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FilterItem } from './FilterItem';
import { filterUtils } from '../utils/filterUtils';

export const TodosFilter = React.memo((props) => {
  const { activeFilter, onFilterClick } = props;

  return (
    <ul className="filters">
      {filterUtils.filters.map((filter) => {
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
});

TodosFilter.propTypes = {
  activeFilter: PropTypes.string.isRequired,
  onFilterClick: PropTypes.func.isRequired,
};
