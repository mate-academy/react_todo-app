import React from 'react';
import PropTypes from 'prop-types';

export const Button = ({
  id,
  name,
  className,
  text,
  handlerClick,
}) => (
  <button
    id={id}
    name={name}
    type="button"
    className={className}
    onClick={handlerClick}
  >
    {text}
  </button>

);

Button.defaultProps = {
  text: '',
};

Button.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  text: PropTypes.string,
  handlerClick: PropTypes.func.isRequired,

};
