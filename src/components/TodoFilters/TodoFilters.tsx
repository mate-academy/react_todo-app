import classNames from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import { FilterType } from '../../types/FilterType';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  setFiltredTodos: (filtredTodos: Todo[]) => void,
  clearCompleted: () => void,
  completedTodos: number,
};

export const TodoFilters: React.FC<Props> = ({
  todos,
  setFiltredTodos,
  clearCompleted,
  completedTodos,
}) => {
  const [typeOfFilter, setTypeOfFilter] = useState(FilterType.All);

  const filterHendler = (filter: FilterType) => {
    setTypeOfFilter(filter);
  };

  const filtredTodos = useMemo(() => {
    const toFilter = todos.filter(item => {
      switch (typeOfFilter) {
        case FilterType.Active:
          return !item.completed;
        case FilterType.Completed:
          return item.completed;
        default:
          return item;
      }
    });

    return toFilter;
  }, [typeOfFilter, todos]);

  useEffect(() => {
    setFiltredTodos(filtredTodos);
  }, [filtredTodos]);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {todos.filter(todo => !todo.completed).length}
        {' '}
        items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={classNames(
            'filter__link', { selected: typeOfFilter === FilterType.All },
          )}
          onClick={() => filterHendler(FilterType.All)}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={classNames(
            'filter__link', { selected: typeOfFilter === FilterType.Active },
          )}
          onClick={() => filterHendler(FilterType.Active)}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={classNames(
            'filter__link', {
              selected: typeOfFilter === FilterType.Completed,
            },
          )}
          onClick={() => filterHendler(FilterType.Completed)}
        >
          Completed
        </a>
      </nav>

      <button
        data-cy="ClearCompletedButton"
        style={{
          visibility: !completedTodos ? 'hidden' : 'visible',
        }}
        type="button"
        className="todoapp__clear-completed"
        onClick={clearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
