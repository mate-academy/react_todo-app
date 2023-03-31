import { FilterNavLink } from './FilterNavLink';

export const TodoFilter:React.FC = () => {
  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <FilterNavLink to="/" title="all" />
      </li>
      <li>
        <FilterNavLink to="/active" title="active" />
      </li>
      <li>
        <FilterNavLink to="/completed" title="completed" />
      </li>
    </ul>
  );
};
