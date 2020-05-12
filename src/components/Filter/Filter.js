import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export const Filter = ({
  filterName,
  currentActiveItems,
  setActiveItems,
}) => (
  <li>
    <a
      href={`#/${filterName.toLowerCase()}`}
      className={classNames({
        selected: filterName === currentActiveItems,
      })}
      onClick={() => setActiveItems(filterName)}
    >
      {filterName}
    </a>
  </li>
);

Filter.propTypes = {
  filterName: PropTypes.string.isRequired,
  currentActiveItems: PropTypes.string.isRequired,
  setActiveItems: PropTypes.func.isRequired,
};
