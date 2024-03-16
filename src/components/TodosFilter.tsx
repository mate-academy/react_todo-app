import classNames from 'classnames';
import React from 'react';
import { Filter } from '../types/Filter';

type Props = {
  filter: string;
  onChange?: (filter: string) => void;
};

export const TodosFilter: React.FC<Props> = ({
  filter,
  onChange = () => {},
}) => {
  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={classNames({
            selected: filter === Filter.ALL,
          })}
          onClick={() => {
            onChange(Filter.ALL);
          }}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={classNames({
            selected: filter === Filter.ACTIVE,
          })}
          onClick={() => {
            onChange(Filter.ACTIVE);
          }}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={classNames({
            selected: filter === Filter.COMPLETED,
          })}
          onClick={() => {
            onChange(Filter.COMPLETED);
          }}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
