import { useContext } from 'react';
import cn from 'classnames';

import { ToDoContext } from '../Context/ToDoContext';
import { filterNames } from '../../Constants/filterNames';

export const TodosFilter = () => {
  const { setFilter, filter } = useContext(ToDoContext);

  return (
    <ul className="filters">
      {filterNames.map(({ filterButton, href }) => (
        <li key={filterButton}>
          <a
            href={href}
            className={cn({ selected: filterButton === filter })}
            onClick={() => setFilter(filterButton)}
          >
            {filterButton}
          </a>
        </li>
      ))}

    </ul>
  );
};
