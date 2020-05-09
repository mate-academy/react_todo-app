import React from 'react';
import PropTypes from 'prop-types';

export const TextInput = ({
  value,
  id,
  name,
  className,
  placeholder,
  autoFocus,
  handleChange,
  handleBlur,
}) => (
  <input
    value={value}
    id={id}
    name={name}
    type="text"
    className={className}
    placeholder={placeholder}
    autoFocus={autoFocus}
    autoComplete="off"
    onChange={handleChange}
    onBlur={handleBlur}
  />
);

TextInput.defaultProps = {
  placeholder: '',
  autoFocus: false,
  handleBlur: () => {},
};

TextInput.propTypes = {
  value: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func,
};
