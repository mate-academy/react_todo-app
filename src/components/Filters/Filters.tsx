import React, { useContext, useRef } from 'react';
import cn from 'classnames';
import './Filters.scss';
import { DispatchContext, TodosContext } from '../../state/State';
import { Filter } from '../../types/Filter';

export const Filters: React.FC = () => {
  const { filterBy } = useContext(TodosContext);
  const dispatch = useContext(DispatchContext);

  const filterFilds = useRef([Filter.all, Filter.active, Filter.completed]);

  return (
    <ul className="filters">
      {filterFilds.current.map(el => (
        <li key={el} className="filters__item">
          <a
            href="#/"
            className={cn('filters__link', {
              'filters__link--selected': filterBy === el,
            })}
            onClick={() => dispatch(
              { type: 'setFilter', payload: el as Filter },
            )}
          >
            {el}
          </a>
        </li>
      ))}
    </ul>
  );
};
