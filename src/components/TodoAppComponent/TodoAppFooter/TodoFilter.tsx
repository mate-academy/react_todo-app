import { Filters } from '../../../types/Filters';

interface PropsTodoFilter {
  filtered: string;
  setFiltered(filter: Filters): void;
}
export const TodoFilter = ({ filtered, setFiltered }: PropsTodoFilter) => {
  return (
    <nav className="filter">
      <a
        href="#/"
        className={filtered === Filters.All
          ? 'filter__link selected'
          : 'filter__link'}
        onClick={() => setFiltered(Filters.All)}
      >
        All
      </a>

      <a
        href="#/active"
        className={filtered === 'Active'
          ? 'filter__link selected'
          : 'filter__link'}
        onClick={() => setFiltered(Filters.Active)}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={filtered === 'Completed'
          ? 'filter__link selected'
          : 'filter__link'}
        onClick={() => setFiltered(Filters.Completed)}
      >
        Completed
      </a>
    </nav>
  );
};
