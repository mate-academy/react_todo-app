import React from 'react';

type Props = {
  children: JSX.Element[];
};

export const TodoList: React.FC<Props> = ({ children }) => (
  <ul
    className="todoapp__list"
    data-cy="todosList"
  >
    {children}
  </ul>
);
