import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({
  filter,
  setFilter,
}) => (
  <span>
    <ul className="filters">
      <li>

        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          href="#"
          className={filter === 'all'
            ? 'selected'
            : ''}
          onClick={() => setFilter('all')}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={filter === 'active'
            ? 'selected'
            : ''}
          onClick={() => setFilter('active')}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={filter === 'completed'
            ? 'selected'
            : ''}
          onClick={() => setFilter('completed')}
        >
          Completed
        </a>
      </li>
    </ul>
  </span>
);

Footer.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default Footer;
