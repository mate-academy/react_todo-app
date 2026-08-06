import classNames from 'classnames';
import { useSetFilter } from '../../hooks/useFilterSetter';
import { FilterItem } from '../../types/FilterItem';
import './TodoFilter.scss';
import { useFilter } from '../../hooks/useFilter';

const filters: FilterItem[] = [
  {
    label: 'All',
    value: 'all',
    href: '#/',
    dataCy: 'FilterLinkAll',
  },

  {
    label: 'Active',
    value: 'active',
    href: '#/active',
    dataCy: 'FilterLinkActive',
  },

  {
    label: 'Completed',
    value: 'completed',
    href: '#/completed',
    dataCy: 'FilterLinkCompleted',
  },
];

export const TodoFilter = () => {
  const setFilter = useSetFilter();
  const filter = useFilter();

  return (
    <nav className="todo-filter" data-cy="Filter">
      {filters.map(filterItem => (
        <a
          key={filterItem.value}
          href={filterItem.href}
          className={classNames('todo-filter__link', {
            selected: filterItem.value === filter,
          })}
          data-cy={filterItem.dataCy}
          onClick={() => setFilter(filterItem.value)}
        >
          {filterItem.label}
        </a>
      ))}
    </nav>
  );
};
