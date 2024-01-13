import cn from 'classnames';
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
        <li key={el}>
          <a
            href="#/"
            className={cn({
              selected: filterBy === el,
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
