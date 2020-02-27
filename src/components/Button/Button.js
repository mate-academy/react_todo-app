import React from 'react';
import PropTypes from 'prop-types';

import './Button.css';

const Button = (props) => {
  const {
    className,
    onClick,
    children,
    icon,
  } = props;

  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      {...props}
    >
      {icon
        ? <i className="material-icons">{icon}</i>
        : children
      }
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
