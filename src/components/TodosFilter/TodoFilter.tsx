import React, { useContext, useState, FC } from 'react';
import classNames from 'classnames';
import { Status } from '../../enums/Status';
import { TodosContext } from '../../context/TodosContext';

export const TodosFilter: FC = () => {
  const { updateFilter } = useContext(TodosContext);
  const [selectedFilter, setSelectedFilter] = useState<Status>(Status.All);

  const handleFilterClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    filter: Status,
  ) => {
    event.preventDefault();
    setSelectedFilter(filter);
    updateFilter(filter);
  };

  return (
    <ul className="filters">
      {Object.values(Status).map((status) => (
        <li key={status}>
          <a
            href={`#/${status.toLowerCase()}`}
            className={classNames({ selected: selectedFilter === status })}
            onClick={event => handleFilterClick(event, status)}
          >
            {status}
          </a>
        </li>
      ))}
    </ul>
  );
};
