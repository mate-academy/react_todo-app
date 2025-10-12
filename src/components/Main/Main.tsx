import React from 'react';
import { TodoList } from '../TodoList';
import { Filter } from '../../types/Filter';

type Props = {
  filter: Filter;
};

export const Main: React.FC<Props> = ({ filter }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      <TodoList filter={filter} />
    </section>
  );
};
