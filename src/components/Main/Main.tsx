import React from 'react';
import { TodoList } from '../TodoList';

type Props = {};

const MainBase: React.FC<Props> = () => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      <TodoList />
    </section>
  );
};

export const Main = React.memo(MainBase);
