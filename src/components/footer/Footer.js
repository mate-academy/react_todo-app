import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({ filter, setFilter }) => (
  <span>
    <ul className="filters">
      {Object.values(filter).map(filt => (
        <li>
          <a
            href={`/#${filt}`}
            className={filter === filt
              ? 'selected'
              : ''}
            onClick={() => setFilter(filt)}
          >
            {filt}
          </a>
        </li>
      ))}
    </ul>
  </span>
);

Footer.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default Footer;
