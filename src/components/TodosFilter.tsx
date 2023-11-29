import cn from 'classnames';
import { useContext } from 'react';
import { DispatchContext, StateContext } from './TodosContext';
import { Status } from '../types/Status';

export const TodoFilter = () => {
  const dispatch = useContext(DispatchContext);
  const { filteredBy } = useContext(StateContext);

  const filters = Object.values(Status);

  const handleFilter = (filterBy: Status) => {
    dispatch({
      type: 'filter',
      payload: filterBy,
    });
  };

  return (
    <ul className="filters" data-cy="todosFilter">
      {
        filters.map(filter => {
          const filterName = filter[0].toUpperCase() + filter.slice(1);

          return (
            <li key={filter}>
              <a
                href={`#/${filter === Status.All ? '' : filter}`}
                className={
                  cn({
                    selected: filteredBy === filter,
                  })
                }
                onClick={() => handleFilter(filter)}
              >
                {filterName}
              </a>
            </li>
          );
        })
      }
    </ul>
  );
};
