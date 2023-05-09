import { FilterNavLink } from './FilterNavLink';

export const TodosFilter:React.FC = () => {
  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <FilterNavLink to="/" text="All" />
      </li>

      <li>
        <FilterNavLink to="active" text="Active" />
      </li>

      <li>
        <FilterNavLink to="completed" text="Completed" />
      </li>
    </ul>
  );
};
