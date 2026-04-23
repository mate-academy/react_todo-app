import React from 'react';

type Props = {
  children: React.ReactNode;
};

const ContentBase: React.FC<Props> = ({ children }) => {
  return <div className="todoapp__content">{children}</div>;
};

export const Content = React.memo(ContentBase);
