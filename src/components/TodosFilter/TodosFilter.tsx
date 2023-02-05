import { FC, memo } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { FilterStatus } from '../../types/FilterStatus';
import { SearchLink } from '../SearchLink';

interface Props {
  todosLength: number;
  completedTodosLength: number;
  removeAllCompletedTodos: () => Promise<void>;
}

export const TodosFilter: FC<Props> = memo(({
  todosLength,
  completedTodosLength,
  removeAllCompletedTodos,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedStatus = searchParams.get('selectedStatus') || null;

  const uncompletedTodosLength = todosLength - completedTodosLength;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${uncompletedTodosLength} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.entries(FilterStatus).map(([key, value]) => (
          <SearchLink
            key={value}
            params={({ selectedStatus: value || null })}
            data-cy={`FilterLink${key}`}
            className={classNames(
              'filter__link',
              { selected: selectedStatus === value },
            )}
            onClick={() => setSearchParams(value)}
          >
            {key}
          </SearchLink>
        ))}
      </nav>

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className={classNames(
          'todoapp__clear-completed',
          { 'todoapp__clear-completed--hidden': completedTodosLength === 0 },
        )}
        onClick={removeAllCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
});
