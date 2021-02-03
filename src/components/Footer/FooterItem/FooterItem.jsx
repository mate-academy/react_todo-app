import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const FooterItem = ({ link, text, run }) => (
  <Link
    to={link}
    className="basic"
    onClick={run}
  >
    {text}
  </Link>
);

FooterItem.propTypes = {
  link: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  run: PropTypes.func.isRequired,
};
