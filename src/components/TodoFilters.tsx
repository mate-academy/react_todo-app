import { FiltersList, FilterLink } from './styled-components';

const filters = [
  { to: '/', label: 'All' },
  { to: '/active', label: 'Active' },
  { to: '/completed', label: 'Completed' },
];

export const TodoFilters = () => {
  return (
    <FiltersList>
      {filters.map((filter) => (
        <li key={filter.label}>
          <FilterLink to={filter.to}>{filter.label}</FilterLink>
        </li>
      ))}
    </FiltersList>
  );
};
