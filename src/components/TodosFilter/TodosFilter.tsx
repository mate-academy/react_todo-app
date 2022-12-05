import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { Status } from '../../types/Status';

interface Props {
  filters: Status[];
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
            {(filter === Status.ALL)
              ? 'All'
              : (filter[1].toUpperCase() + filter.slice(2))}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
