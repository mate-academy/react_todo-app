import classNames from 'classnames';
import { FilterBy } from '../types/FilterOptions';

type Props = {
  filterBy: FilterBy,
  setFilterBy: (option: FilterBy) => void;
};

export const TodosFilter: React.FC<Props> = ({ filterBy, setFilterBy }) => {
  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          onClick={e => {
            e.preventDefault();
            setFilterBy(FilterBy.All);
          }}
          className={classNames(
            { selected: filterBy === FilterBy.All },
          )}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          onClick={e => {
            e.preventDefault();
            setFilterBy(FilterBy.Active);
          }}
          className={classNames(
            { selected: filterBy === FilterBy.Active },
          )}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          onClick={e => {
            e.preventDefault();
            setFilterBy(FilterBy.Completed);
          }}
          className={classNames(
            { selected: filterBy === FilterBy.Completed },
          )}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
