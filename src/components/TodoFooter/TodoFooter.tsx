import classNames from 'classnames';
import { FilterTypes } from '../../Types/FilterEnum';

interface Props {
  filter: FilterTypes,
  setFilter: (value: FilterTypes) => void,
  handleDeleteAllCompleted: () => void,
  countNotCompleted: number,
  countCompleted: number,
}

export const TodoFooter: React.FC<Props> = ({
  filter,
  setFilter,
  handleDeleteAllCompleted,
  countNotCompleted,
  countCompleted,
}) => {
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
              { selected: filter === FilterTypes.All },
            )}
            onClick={() => setFilter(FilterTypes.All)}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={classNames(
              { selected: filter === FilterTypes.Active },
            )}
            onClick={() => setFilter(FilterTypes.Active)}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={classNames(
              { selected: filter === FilterTypes.Completed },
            )}
            onClick={() => setFilter(FilterTypes.Completed)}
          >
            Completed
          </a>
        </li>
      </ul>
      {countCompleted > 0 && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleDeleteAllCompleted}
        >
          Clear completed
        </button>
      )}

    </footer>
  );
};
