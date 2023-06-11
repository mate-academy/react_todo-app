import { FC } from 'react';
import { Filters } from './Filters';

interface PropsTodoFilter {
  setFiltered: (filtered: Filters) => void;
  filtered: Filters;
}

export const TodoFilter: FC<PropsTodoFilter> = ({ setFiltered, filtered }) => {
  return (

    <ul className="filters">
      <li>
        <a
          href="#/"
          className={filtered === Filters.All ? 'selected' : ''}
          onClick={() => setFiltered(Filters.All)}
        >
          All

        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={filtered === Filters.Active ? 'selected' : ''}
          onClick={() => setFiltered(Filters.Active)}
        >
          Active

        </a>
      </li>

      <li>
        <a
          href="#/completed"
          onClick={() => setFiltered(Filters.Completed)}
          className={filtered === Filters.Completed ? 'selected' : ''}
        >
          Completed

        </a>
      </li>
    </ul>

  );
};
