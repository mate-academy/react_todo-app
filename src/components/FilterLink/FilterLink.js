import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './FilterLink.css';

const FilterLink = ({ title, active, onClick, icon }) => (
  <button
    type="button"
    className={classNames({
      'is-active': active,
    })}
    onClick={onClick}
    title={title}
  >
    <i className="material-icons">{icon}</i>
  </button>
);

FilterLink.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default FilterLink;
