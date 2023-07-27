import { Status } from '../types/Status';
import { FilterNavLink } from './FilterNavLink';

type Props = {
  activeTodosLength: number,
  removeAllCompletedTodosFromServer: () => void,
};

export const TodosFilter: React.FC<Props> = ({
  activeTodosLength,
  removeAllCompletedTodosFromServer,
}) => {
  const filters = [
    { title: 'All', path: Status.All },
    { title: 'Active', path: Status.Active },
    { title: 'Completed', path: Status.Completed },
  ];

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${activeTodosLength} items left`}
      </span>

      <ul className="filters">
        {filters.map(filterType => (
          <FilterNavLink
            key={filterType.title}
            path={filterType.path}
            title={filterType.title}
          />
        ))}
      </ul>

      <button
        type="button"
        className="clear-completed"
        onClick={removeAllCompletedTodosFromServer}
      >
        Clear completed
      </button>
    </footer>
  );
};
