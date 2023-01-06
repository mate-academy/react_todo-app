import React from 'react';

type Props = {
  children: React.ReactNode;
};

export const TodoList: React.FC<Props> = ({ children }) => (
  <>
    {children}
  </>
);
