import React from 'react';

type Props = {
  children: React.ReactNode;
};

export const Section:React.FC<Props> = ({ children }) => {
  return (
    <section className="main">
      {children}
    </section>
  );
};
