import { Status } from '../types/Status';
import { FilterNavLink } from './FilterNavLink';

type Props = {
  activeTodosLength: number,
  completedTodosLength: number,
  removeAllCompletedTodosFromServer: () => void,
};

export const TodosFilter: React.FC<Props> = ({
  activeTodosLength,
  completedTodosLength,
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

      {!!completedTodosLength && (
        <button
          type="button"
          className="clear-completed"
          onClick={removeAllCompletedTodosFromServer}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
