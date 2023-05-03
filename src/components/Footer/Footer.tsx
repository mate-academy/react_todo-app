import { FC } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Filter } from '../../types/Filter';

type Props = {
  onFilter: (arg: Filter) => void,
  filterType: Filter,
  containsCompleted: boolean,
  onClearCompleted: () => void,
  itemsLeft: number,
};

export const Footer: FC<Props> = ({
  onFilter,
  filterType,
  containsCompleted,
  onClearCompleted,
  itemsLeft,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${itemsLeft} items left`}
      </span>

      <nav className="filter">
        <Link
          to="/"
          className={classNames(
            'filter__link',
            { selected: filterType === Filter.All },
          )}
          onClick={() => onFilter(Filter.All)}
        >
          All
        </Link>

        <Link
          to="active"
          className={classNames(
            'filter__link',
            { selected: filterType === Filter.Active },
          )}
          onClick={() => onFilter(Filter.Active)}
        >
          Active
        </Link>

        <Link
          to="completed"
          className={classNames(
            'filter__link',
            { selected: filterType === Filter.Completed },
          )}
          onClick={() => onFilter(Filter.Completed)}
        >
          Completed
        </Link>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        style={{ visibility: containsCompleted ? 'visible' : 'hidden' }}
        onClick={onClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
