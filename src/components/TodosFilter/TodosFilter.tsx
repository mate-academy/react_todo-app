import React from 'react';
import cn from 'classnames';
import { Status } from '../../types/enums';

type Props = {
  selected: Status,
  setSelected: (status: Status) => void,
};

export const TodosFilter: React.FC<Props> = ({
  selected,
  setSelected,
}) => {
  return (
    <ul
      className="filters"
      data-cy="todosFilter"
    >
      <li>
        <a
          href="#/"
          className={cn({
            selected: selected === Status.All,
          })}
          onClick={() => setSelected(Status.All)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={cn({
            selected: selected === Status.Active,
          })}
          onClick={() => setSelected(Status.Active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={cn({
            selected: selected === Status.Completed,
          })}
          onClick={() => setSelected(Status.Completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
