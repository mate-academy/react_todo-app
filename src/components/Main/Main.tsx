import React from 'react';
import { TodoList } from '../TodoList';
import classNames from 'classnames';
import { Filter } from '../../types/Filter';

type Props = {
  IsLoadLoader: boolean;
  filter: Filter;
};

export const Main: React.FC<Props> = ({ IsLoadLoader, filter }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      <TodoList filter={filter} />

      <div
        data-cy="TodoLoader"
        className={classNames('modal overlay', { 'is-active': IsLoadLoader })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </section>
  );
};
