import React from 'react';

type Props = {
  children:React.ReactNode;
};

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="todoapp">
      { children}
    </div>
  );
};
