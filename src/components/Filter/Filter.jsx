import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const Filter = ({ setFilter, filters }) => (
  <ul className="filters">
    <Link
      to="/"
      className="basic"
      onClick={() => setFilter(filters.all)}
    >
      All
    </Link>

    <Link
      to="/active"
      className="basic"
      onClick={() => setFilter(filters.active)}
    >
      Active
    </Link>

    <Link
      to="/completed"
      className="basic"
      onClick={() => setFilter(filters.completed)}
    >
      Completed
    </Link>
  </ul>
);

Filter.propTypes = {
  setFilter: PropTypes.func.isRequired,
  filters: PropTypes.objectOf(PropTypes.string).isRequired,
};
