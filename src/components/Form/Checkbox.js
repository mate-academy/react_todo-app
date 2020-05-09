import React from 'react';
import PropTypes from 'prop-types';

export const Checkbox = ({
  id,
  name,
  className,
  checked,
  handleChange,
}) => (
  <input
    id={id}
    name={name}
    type="checkbox"
    checked={checked}
    className={className}
    onChange={handleChange}
  />
);

Checkbox.defaultProps = {
  placeholder: '',
  checked: false,
  handleBlur: () => {},
};

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
};
