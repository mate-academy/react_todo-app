import classNames from 'classnames';
import { FilterBy } from '../types/FilterOptions';

type Props = {
  filterBy: FilterBy,
  setFilterBy: (option: FilterBy) => void;
};

export const TodosFilter: React.FC<Props> = ({ filterBy, setFilterBy }) => {
  const setFilterByAll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setFilterBy(FilterBy.All);
  };

  const setFilterByActive = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setFilterBy(FilterBy.Active);
  };

  const setFilterByCompleted = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setFilterBy(FilterBy.Completed);
  };

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          onClick={setFilterByAll}
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
          onClick={setFilterByActive}
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
          onClick={setFilterByCompleted}
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
