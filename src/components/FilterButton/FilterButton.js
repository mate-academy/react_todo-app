import React from 'react';
import PropTypes from 'prop-types';

export const FilterButton = (props) => {
  const { onClick, className, children } = props;

  return (
    <li>
      <button
        type="button"
        className={className}
        onClick={onClick}
      >
        {children}
      </button>
    </li>
  );
};

FilterButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};
