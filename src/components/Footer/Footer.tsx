import classNames from 'classnames';
import { FC } from 'react';
import { FilterType } from '../../utils/FilterType';

interface Props {
  count: number;
  filterBy: FilterType;
  setFilterBy: (filterBy: FilterType) => void;
  isSomeTodoCompleted: boolean;
  handleClear: () => void;
}

export const Footer: FC<Props> = (
  {
    filterBy,
    setFilterBy,
    isSomeTodoCompleted,
    handleClear,
    count,
  },
) => {
  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${count} items left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={classNames({ selected: filterBy === FilterType.All })}
            onClick={() => setFilterBy(FilterType.All)}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={classNames({ selected: filterBy === FilterType.Active })}
            onClick={() => setFilterBy(FilterType.Active)}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={
              classNames({ selected: filterBy === FilterType.Completed })
            }
            onClick={() => setFilterBy(FilterType.Completed)}
          >
            Completed
          </a>
        </li>
      </ul>

      {isSomeTodoCompleted && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleClear}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
