import classNames from 'classnames';
import { FilterOption } from '../../types/types';
import { HandleFilterChange } from '../../types/handlers';

type Props = {
  filter: FilterOption;
  onFilterChange: HandleFilterChange;
};

export const Filter: React.FC<Props> = ({ filter, onFilterChange }) => {
  const chooseFilter = (newFilter: FilterOption) => {
    if (filter !== newFilter) {
      onFilterChange(newFilter);
    }
  };

  return (
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={classNames('filter__link', {
          selected: filter === FilterOption.All,
        })}
        data-cy="FilterLinkAll"
        onClick={() => chooseFilter(FilterOption.All)}
      >
        {FilterOption.All}
      </a>

      <a
        href="#/active"
        className={classNames('filter__link', {
          selected: filter === FilterOption.Active,
        })}
        data-cy="FilterLinkActive"
        onClick={() => chooseFilter(FilterOption.Active)}
      >
        {FilterOption.Active}
      </a>

      <a
        href="#/completed"
        className={classNames('filter__link', {
          selected: filter === FilterOption.Completed,
        })}
        data-cy="FilterLinkCompleted"
        onClick={() => chooseFilter(FilterOption.Completed)}
      >
        {FilterOption.Completed}
      </a>
    </nav>
  );
};
