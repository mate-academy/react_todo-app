import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export const FilterButton = (props) => {
  const { onClick, selectedFilter, children } = props;

  return (
    <li>
      <a
        href={`#/${selectedFilter === 'all' ? '' : selectedFilter}`}
        className={cx({ selected: selectedFilter === children.toLowerCase() })}
        onClick={onClick}
      >
        {children}
      </a>
    </li>
  );
};

FilterButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  selectedFilter: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};
