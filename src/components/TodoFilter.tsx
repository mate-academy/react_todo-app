import { FilterNavLink } from './FilterNavLink';

export const TodoFilter: React.FC = () => {
  return (
    <>
      <ul className="filters">
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
    </>
  );
};
