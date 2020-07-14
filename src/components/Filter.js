import React from 'react';
import PropTypes from 'prop-types';

export const Filter = (props) => {
  const { name, setAsSelected, activeButton } = props;
  const isActive = activeButton === name;

  return (
    <li>
      <button
        type="button"
        name={name}
        className={isActive ? 'selected' : ''}
        onClick={setAsSelected}
      >
        {name}
      </button>
    </li>
  );
};

Filter.propTypes = {
  name: PropTypes.string.isRequired,
  setAsSelected: PropTypes.func.isRequired,
  activeButton: PropTypes.string.isRequired,
};
