import cn from 'classnames';

import { FilterOption } from '../types/FilterOption';
import { useCallback, useContext } from 'react';
import { StateContext } from '../context/GlobalContextProvider';
import { DispatchContext } from '../context/GlobalContextProvider';

export const Filter: React.FC = () => {
  const { filter } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const handleFilterSelection = useCallback(
    (option: FilterOption) =>
      dispatch({
        type: 'setFilter',
        payload: option,
      }),
    [dispatch],
  );

  return (
    <nav className="filter" data-cy="Filter">
      {Object.values(FilterOption).map(curOption => {
        const capitalizedFilter = `${curOption.charAt(0).toUpperCase()}${curOption.substring(1)}`;

        return (
          <a
            key={curOption}
            href={`#/${curOption === 'all' ? '' : curOption}`}
            className={cn('filter__link', {
              selected: filter === curOption,
            })}
            data-cy={`FilterLink${capitalizedFilter}`}
            onClick={() => handleFilterSelection(curOption)}
          >
            {capitalizedFilter}
          </a>
        );
      })}
    </nav>
  );
};
