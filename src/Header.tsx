import React from 'react';

type Props = {
  children: JSX.Element;
};

export const Header: React.FC<Props> = ({ children }) => (
  <header className="todoapp__header">
    {children}
  </header>
);
