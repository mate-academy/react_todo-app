import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export const FilterLink = (props) => {
  const {
    url,
    value,
  } = props.link;

  const {
    currentValue,
    isActiveLink,
  } = props;

  return (
    <li>
      <a
        href={url}
        className={classnames({
          selected: currentValue === value,
        })}
        onClick={() => isActiveLink(value)}
      >
        {value}
      </a>
    </li>
  );
};

FilterLink.propTypes = {
  link: PropTypes.shape({
    url: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
  currentValue: PropTypes.string.isRequired,
  isActiveLink: PropTypes.func.isRequired,
};
