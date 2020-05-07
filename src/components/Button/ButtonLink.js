import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

export const ButtonLink = ({
  href,
  id,
  name,
  text,
  activeFilter,
  setFilter,
}) => (
  <a
    id={id}
    name={name}
    href={href}
    className={cn({ selected: id === activeFilter })}
    onClick={setFilter}
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
  setFilter: PropTypes.func.isRequired,
};
