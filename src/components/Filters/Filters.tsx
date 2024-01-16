import cn from 'classnames';
import './Filters.scss';
import { useContext } from 'react';
import { DispatchContext, TodosContext } from '../../state/State';
import { Filter } from '../../types/Filter';

export const Filters: React.FC = () => {
  const { filterBy } = useContext(TodosContext);
  const dispatch = useContext(DispatchContext);

  const filterFilds: Filter[] = ['all', 'active', 'completed'];

  return (
    <ul className="filters">
      {filterFilds.map(el => (
        <li key={el} className="filters__item">
          <a
            href="#/"
            className={cn('filters__link', {
              'filters__link--selected': filterBy === el,
            })}
            onClick={() => dispatch({ type: 'setFilter', payload: el })}
          >
            {el}
          </a>
        </li>
      ))}
    </ul>
  );
};
