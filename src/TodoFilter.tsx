import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Filters } from './Filters';

interface PropsTodoFilter {
  setFiltered: (filtered: Filters) => void;
  filtered: Filters;
}

export const TodoFilter: FC<PropsTodoFilter> = ({ setFiltered, filtered }) => {
  return (

    <ul className="filters">
      <li>
        <Link
          to="/"
          className={filtered === Filters.Active ? 'selected' : ''}
          onClick={() => setFiltered(Filters.All)}
        >
          All

        </Link>
      </li>

      <li>
        <Link
          to="active"
          className={filtered === Filters.Active ? 'selected' : ''}
          onClick={() => setFiltered(Filters.Active)}
        >
          Active

        </Link>
      </li>

      <li>
        <Link
          to="completed"
          onClick={() => setFiltered(Filters.Completed)}
          className={filtered === Filters.Completed ? 'selected' : ''}
        >
          Completed

        </Link>
      </li>
    </ul>

  );
};
