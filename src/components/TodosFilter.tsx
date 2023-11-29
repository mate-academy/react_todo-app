import cn from 'classnames';

import { useState, useContext } from 'react';
import { FilterContext } from '../FilterContext';
import { Status } from '../types/Status';

export const TodoFilter: React.FC = () => {
  const { status, setStatus } = useContext(FilterContext);
  const [isSelected, setIsSelected] = useState<Status>(status);

  const handleFilterClick = (filterStatus: Status) => {
    setIsSelected(filterStatus);
    setStatus(filterStatus);
  };

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={cn({
            selected: isSelected === Status.All,
          })}
          onClick={() => handleFilterClick(Status.All)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href={`#/${Status.Active}`}
          className={cn({
            selected: isSelected === Status.Active,
          })}
          onClick={() => handleFilterClick(Status.Active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href={`#/${Status.Completed}`}
          className={cn({
            selected: isSelected === Status.Completed,
          })}
          onClick={() => handleFilterClick(Status.Completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
