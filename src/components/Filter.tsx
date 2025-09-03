import React, { useContext } from 'react';
import { Status } from '../types/Status';
import cn from 'classnames';
import { TodoContext } from './TodoContext';

export const Filter: React.FC = () => {
  const { filterStatus, setFilterStatus } = useContext(TodoContext);

  return (
    <nav className="filter" data-cy="Filter">
      {Object.values(Status).map(status => {
        const title = status.charAt(0).toUpperCase() + status.slice(1);

        return (
          <a
            key={status}
            href={`#/${status}`}
            className={cn('filter__link', {
              selected: filterStatus === status,
            })}
            data-cy={`FilterLink${title}`}
            onClick={() => setFilterStatus(status)}
          >
            {title}
          </a>
        );
      })}
    </nav>
  );
};
