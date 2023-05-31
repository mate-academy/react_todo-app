import classNames from 'classnames';
import { Filter } from '../../Types/FilterEnum';

interface Props {
  filter: Filter,
  setFilter: (value: Filter) => void,
  handleDeleteEveryCompleted: () => void,
  countNotCompleted: number,
  countCompleted: number,
}

export const TodoFooter: React.FC<Props> = ({
  filter,
  setFilter,
  handleDeleteEveryCompleted,
  countNotCompleted,
  countCompleted,
}) => {
  const handleFilter = (value: Filter) => {
    setFilter(value);
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${countNotCompleted} items left`}
      </span>

      <ul className="filters" data-cy="todosFilter">
        <li>
          <a
            href="#/"
            className={classNames(
              { selected: filter === Filter.All },
            )}
            onClick={() => handleFilter(Filter.All)}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={classNames(
              { selected: filter === Filter.Active },
            )}
            onClick={() => handleFilter(Filter.Active)}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={classNames(
              { selected: filter === Filter.Completed },
            )}
            onClick={() => handleFilter(Filter.Completed)}
          >
            Completed
          </a>
        </li>
      </ul>
      {countCompleted > 0 && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleDeleteEveryCompleted}
        >
          Clear completed
        </button>
      )}

    </footer>
  );
};
