import classNames from 'classnames';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FilterType } from '../types/filterType';
import { Todo } from '../types/Todo';
import { getSearchWith } from '../utils/getSearchWith';

type Props = {
  visibleTodos: Todo[],
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
};

export const Footer = ({
  todos,
  setTodos,
  visibleTodos,
}: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const completedTodos = visibleTodos.filter(todo => todo.completed);
  const itemsLeft = todos.filter((todo: Todo) => !todo.completed).length;

  const filterType = useMemo(() => {
    return searchParams.get('filter') || FilterType.All;
  }, [searchParams]);

  const clearCompletedHandler = () => {
    setTodos(todos.filter(el => !el.completed));
  };

  const handleOnClick = (type: FilterType) => {
    setSearchParams(
      getSearchWith(searchParams, {
        filter: type,
      }),
    );
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${itemsLeft} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <button
          type="button"
          data-cy="FilterLinkAll"
          className={classNames('filter__link', {
            selected: filterType === FilterType.All,
          })}
          onClick={() => handleOnClick(FilterType.All)}
        >
          All
        </button>

        <button
          type="button"
          data-cy="FilterLinkActive"
          className={classNames('filter__link', {
            selected: filterType === FilterType.Active,
          })}
          onClick={() => handleOnClick(FilterType.Active)}
        >
          Active
        </button>
        <button
          type="button"
          data-cy="FilterLinkCompleted"
          className={classNames('filter__link', {
            selected: filterType === FilterType.Completed,
          })}
          onClick={() => handleOnClick(FilterType.Completed)}
        >
          Completed
        </button>
      </nav>

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className={classNames(
          'todoapp__clear-completed',
          { hidden: completedTodos.length === 0 },
        )}
        onClick={clearCompletedHandler}
      >
        Clear completed
      </button>
    </footer>
  );
};
