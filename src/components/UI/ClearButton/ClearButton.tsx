import React from 'react';

import './ClearButton.scss';

interface Props {
  children: React.ReactNode,
}

const ClearButton: React.FC<Props> = ({
  children,
}) => {
  return (
    <button type="button" className="clear-completed">
      {children}
    </button>
  );
};

export default ClearButton;
