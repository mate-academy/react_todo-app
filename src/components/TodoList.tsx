import React, { FC } from 'react';

type Props = {
  children: React.ReactNode;
};

export const TodoList: FC<Props> = ({
  children,
}) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {children}
    </ul>
  );
};
