import React from 'react';

import './Error.css';

type Props = {
  message: string,
};

export const Error: React.FC<Props> = ({ message }) => (
  <p className="Error">{`${message}`}</p>
);
