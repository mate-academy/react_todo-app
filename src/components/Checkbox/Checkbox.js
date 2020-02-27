import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({ checked, onClick }) => (
  <button type="button" className="checkbox icon" onClick={onClick}>
    <i className="material-icons">
      {checked ? 'check_box' : 'check_box_outline_blank'}
    </i>
  </button>
);

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Checkbox;
