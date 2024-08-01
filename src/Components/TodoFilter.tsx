import cn from 'classnames';
import { Filter } from '../types/Filter';
import { useContext } from 'react';
import { DispatchContext, StateContext } from '../Strore';

export const TodoFilter: React.FC = () => {
  const { filterStatus } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const handleFilter = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const filterParam = event.currentTarget.textContent;

    if (filterParam === filterStatus) {
      return;
    }

    dispatch({ type: 'setFilterStatus', payload: filterParam as Filter });
  };

  const filterParams = Object.values(Filter);

  return (
    <nav className="filter" data-cy="Filter">
      {filterParams.map(param => {
        return (
          <a
            key={param}
            href={`#/${param.toLocaleLowerCase()}`}
            className={cn('filter__link', {
              selected: filterStatus === param,
            })}
            data-cy={`FilterLink${param}`}
            onClick={handleFilter}
          >
            {param}
          </a>
        );
      })}
    </nav>
  );
};
