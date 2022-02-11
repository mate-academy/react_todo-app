import React from 'react';
import './Notification.scss';

type Props = {
  message: string,
};

export const Notification: React.FC<Props> = ({ message }) => {
  return (
    <div className="Notification">
      {message}
    </div>
  );
};
