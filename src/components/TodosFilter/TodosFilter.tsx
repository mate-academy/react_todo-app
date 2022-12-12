import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { FilterStatus } from '../../types/FilterStatus';

interface Props {
  filters: FilterStatus[];
}

export const TodosFilter: React.FC<Props> = ({
  filters,
}) => {
  return (
    <ul className="filters" data-cy="todosFilter">
      {filters.map(filter => (
        <li key={filter}>
          <NavLink
            to={filter}
            className={({ isActive }) => (
              classNames(
                {
                  selected: isActive,
                },
              )
            )}
          >
            {(filter === FilterStatus.ALL)
              ? 'All'
              : (filter[1].toUpperCase() + filter.slice(2))}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
