import cn from 'classnames';
import { useContext, useState } from 'react';
import { Filter } from '../types/Filter';
import { StateContext } from './TodoContext';

export const TodoFilter: React.FC = () => {
  const { filterBy } = useContext(StateContext);
  const [selectedFilter, setSelectedFilter] = useState(filterBy);
  const handleSelectedFilter = (filter: Filter) => {
    setSelectedFilter(item => ({
      ...item,
      filterBy: filter,
    }));
  };

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={cn({
            selected: selectedFilter === Filter.all,
          })}
          onClick={() => handleSelectedFilter(Filter.all)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={cn({
            selected: selectedFilter === Filter.active,
          })}
          onClick={() => handleSelectedFilter(Filter.active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={cn({
            selected: selectedFilter === Filter.completed,
          })}
          onClick={() => handleSelectedFilter(Filter.completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
