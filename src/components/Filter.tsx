import React, { useContext } from 'react';
import { Status } from '../types/Status';
import cn from 'classnames';
import { TodoContext } from './TodoContext';

export const Filter: React.FC = () => {
  const { filterStatus, setFilterStatus } = useContext(TodoContext);

  return (
    <nav className="filter" data-cy="Filter">
      {Object.values(Status).map(status => {
        return (
          <a
            key={status}
            href={`#/${status}`}
            className={cn('filter__link', {
              selected: filterStatus === status,
            })}
            data-cy={`FilterLink${status}`}
            onClick={() => setFilterStatus(status)}
          >
            {status}
          </a>
        );
      })}
    </nav>
  );
};
