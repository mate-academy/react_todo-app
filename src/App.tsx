/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Outlet } from 'react-router-dom';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <Outlet />
    </div>
  );
};
