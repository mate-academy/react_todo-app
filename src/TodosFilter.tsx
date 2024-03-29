import React from 'react';
import { Status } from './enums/Status';
import cn from 'classnames';

type Props = {
  filter: Status;
  setFilter: (filter: Status) => void;
};

export const TodosFilter: React.FC<Props> = ({ filter, setFilter }) => {
  return (
    <ul className="filters" data-cy="todosFilter">
      {Object.values(Status).map(status => (
        <li key={status}>
          <a
            href={status === Status.all ? '#/' : `#/${status.toLowerCase()}`}
            className={cn({
              selected: status === filter,
            })}
            onClick={() => setFilter(status)}
          >
            {status}
          </a>
        </li>
      ))}
    </ul>
  );
};
