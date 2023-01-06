import React from 'react';

type Props = {
  children: JSX.Element;
};

export const TodoList: React.FC<Props> = ({ children }) => (
  <section className="todoapp__main">
    {children}
  </section>
);
