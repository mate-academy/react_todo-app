import { useContext, useState } from 'react';
import { DispatchContext } from './TodosContext';
import { FilterType } from '../types/Todo';

export const TodoFilter = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const dispatch = useContext(DispatchContext);

  const handleClick = (filterBy: FilterType) => {
    setSelectedFilter(filterBy);

    dispatch({
      type: 'filter',
      payload: filterBy,
    });
  };

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          onClick={() => handleClick(FilterType.ALL)}
          className={selectedFilter === 'all' ? 'selected' : ''}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          onClick={() => handleClick(FilterType.ACTIVE)}
          className={selectedFilter === 'active' ? 'selected' : ''}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          onClick={() => handleClick(FilterType.COMPLITED)}
          className={selectedFilter === 'completed' ? 'selected' : ''}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
