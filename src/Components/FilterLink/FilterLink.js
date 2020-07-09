import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export const FilterLink = (props) => {
  const {
    url,
    value,
  } = props.link;

  const {
    currentUrl,
    isActiveLink,
  } = props;

  return (
    <li>
      <a
        href={url}
        className={classnames({
          selected: currentUrl === url,
        })}
        onClick={isActiveLink}
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
  currentUrl: PropTypes.string.isRequired,
  isActiveLink: PropTypes.func.isRequired,
};
