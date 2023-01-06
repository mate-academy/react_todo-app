import React from 'react';

type Props = {
  children: React.ReactNode;
};

export const Footer: React.FC<Props> = ({ children }) => {
  return (
    <footer className="todoapp__footer">
      {children}
    </footer>
  );
};
