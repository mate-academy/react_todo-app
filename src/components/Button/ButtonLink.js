import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

export const ButtonLink = ({
  href,
  id,
  name,
  text,
  activeFilter,
  handleClick,
}) => (
  <a
    id={id}
    name={name}
    href={href}
    className={cn({ selected: id === activeFilter })}
    onClick={handleClick}
  >
    {text}
  </a>
);

ButtonLink.propTypes = {
  href: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  activeFilter: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};
