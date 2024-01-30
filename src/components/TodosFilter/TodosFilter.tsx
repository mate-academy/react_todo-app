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

  const handleFilter = (status: Status) => {
    switch (status) {
      case (Status.Active):
        setSelected(Status.Active);
        break;
      case (Status.Completed):
        setSelected(Status.Completed);
        break;
      default:
        setSelected(Status.All);
    }
  };

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
          onClick={() => handleFilter(Status.All)}
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
          onClick={() => handleFilter(Status.Active)}
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
          onClick={() => handleFilter(Status.Completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
