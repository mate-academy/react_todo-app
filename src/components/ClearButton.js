import React from 'react';
import PropTypes from 'prop-types';

export const ClearButton = (props) => {
  const { onClick } = props;

  const handleButtonClick = () => onClick();

  return (
    <button
      type="button"
      className="clear-completed"
      onClick={handleButtonClick}
    >
      Clear completed
    </button>
  );
};

ClearButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
