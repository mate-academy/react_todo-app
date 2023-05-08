import { filters } from '../../types/Status';
import { FilterNavLink } from '../FilterNavLink';

export const TodosFilter: React.FC = () => {
  return (
    <ul className="filters" data-cy="todosFilter">
      {filters.map(({ title, pathTo }) => (
        <li key={title}>
          <FilterNavLink filterName={title} to={pathTo} />
        </li>
      ))}
    </ul>
  );
};
