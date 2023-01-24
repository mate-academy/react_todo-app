import classNames from 'classnames';
import { FC, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { FilterStatus } from '../../types/FilterStatus';

type Props = {
  hasCompleted: boolean;
  activeCount: number;
  onFilterChange: (value: FilterStatus) => void;
  filter: FilterStatus;
  onClearCompleted: () => void
};

export const Footer: FC<Props> = ({
  hasCompleted,
  activeCount,
  onFilterChange,
  filter,
  onClearCompleted,
}) => {
  const { userName = '' } = useParams<{ userName: string }>();
  const { createSlug } = useContext(AuthContext);

  const userNameParam = createSlug(userName);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${activeCount} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.entries(FilterStatus).map(([key, value]) => (
          <Link
            data-cy={`FilterLink${key}`}
            to={`/${userNameParam}/${value}`}
            className={classNames(
              'filter__link',
              { selected: value === filter },
            )}
            key={value}
            onClick={() => onFilterChange(value)}
          >
            {key}
          </Link>
        ))}
      </nav>

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
        disabled={!hasCompleted}
        onClick={onClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
