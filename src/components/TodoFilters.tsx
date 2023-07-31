import { FiltersList } from './styled-components/FiltersList';
import { FilterLink } from './styled-components/FilterLink';

export const TodoFilters = () => {
  return (
    <FiltersList>
      <li>
        <FilterLink to="/">All</FilterLink>
      </li>

      <li>
        <FilterLink to="/active">Active</FilterLink>
      </li>

      <li>
        <FilterLink to="/completed">Completed</FilterLink>
      </li>
    </FiltersList>
  );
};
