import { useContext, useState } from 'react';
import classNames from 'classnames';
import { Status } from '../../enums/Status';
import { TodosContext } from '../../context/TodosContext';

export const TodosFilter = () => {
  const { updateFilter } = useContext(TodosContext);
  const [selectedFilter, setSelectedFilter] = useState<Status>(Status.All);

  const handleFilterClick = (filter: Status) => {
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
            onClick={() => handleFilterClick(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </a>
        </li>
      ))}
    </ul>
  );
};
