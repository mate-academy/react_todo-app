import cn from 'classnames';
import { Filter, FilterLabels } from '../../entities/Todo';
import { useTodoContext } from '../../context/useTodosContext';

const filters: Record<FilterLabels, Filter> = {
  All: 'all',
  Active: 'active',
  Completed: 'completed',
};

export const FilterButtons = () => {
  const { state, setFilter } = useTodoContext();

  return (
    <nav className="filter" data-cy="Filter">
      {(Object.entries(filters) as [FilterLabels, Filter][]).map(
        ([key, value]) => (
          <a
            key={key}
            href={`#/${value}`}
            className={cn('filter__link', { selected: state.filter === value })}
            data-cy={`FilterLink${key}`}
            onClick={() => setFilter(value)}
          >
            {key}
          </a>
        ),
      )}
    </nav>
  );
};
