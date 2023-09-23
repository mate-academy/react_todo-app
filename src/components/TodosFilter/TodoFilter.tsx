import cn from 'classnames';
import { useState } from 'react';
import { Status } from '../../types/Status';

type Props = {
  setFiltering: (filterBy: Status) => void;
};

export const TodoFilter: React.FC<Props> = ({ setFiltering }) => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const handleFilterClick = (status: Status) => {
    setSelectedFilter(status);
    setFiltering(status);
  };

  const matchStatusHref = (status: Status): string => {
    switch (status) {
      case Status.Active:
        return '#/active';
      case Status.Completed:
        return '#/completed';
      case Status.All:
      default:
        return '#/';
    }
  };

  return (
    <ul className="filters" data-cy="todosFilter">
      {Object.values(Status).map(status => (
        <li key={status}>
          <a
            href={matchStatusHref(status)}
            className={cn({
              selected: selectedFilter === status,
            })}
            onClick={() => handleFilterClick(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </a>
        </li>
      ))}
    </ul>
  );
};
