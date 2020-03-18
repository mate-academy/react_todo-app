import React from 'react';
import PropTypes from 'prop-types';

export const FilterItem = React.memo((props) => {
  const { href, content, className, onFilterClick } = props;

  return (
    <li>
      <a
        href={href}
        className={className}
        onClick={onFilterClick}
      >
        {content}
      </a>
    </li>
  );
});

FilterItem.propTypes = {
  href: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  className: PropTypes.string,
  onFilterClick: PropTypes.func.isRequired,
};

FilterItem.defaultProps = {
  className: '',
};
