import React from 'react';

export const Button: React.FC<React
  .ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children, ...props
}) => {
  return (
    // eslint-disable-next-line react/button-has-type
    <button {...props}>
      {children}
    </button>
  );
};
