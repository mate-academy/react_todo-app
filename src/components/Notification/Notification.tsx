import React from 'react';
import { ErrorType } from '../../types/ErrorType';

type Props = {
  error: ErrorType,
};

export const Notification: React.FC<Props> = ({ error }) => (
  <div className="notification">
    {error}
  </div>
);
