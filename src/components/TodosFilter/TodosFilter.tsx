import { Status } from '../../types/Status';
import { FilterNavLink } from '../FilterNavLink';

export const TodosFilter: React.FC = () => {
  const filters = [
    {
      path: Status.All,
      title: 'All',
    },
    {
      path: Status.Active,
      title: 'Active',
    },
    {
      path: Status.Completed,
      title: 'Completed',
    },
  ];

  return (
    <ul className="filters" data-cy="todosFilter">
      {filters.map(({ path, title }) => (
        <FilterNavLink
          key={title}
          to={path}
          title={title}
        />
      ))}
    </ul>
  );
};
