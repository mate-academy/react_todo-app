import React from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { FilterBy } from '../types/Filter';

interface Props {
  todosShow: Todo[],
  filterBy: FilterBy,
  setFilterBy: (filterBy: FilterBy) => void,
  deleteTodoCompleted: () => void;
}

export const Footer: React.FC<Props> = ({
  todosShow,
  filterBy,
  setFilterBy,
  deleteTodoCompleted,
}) => {
  const todoLeft = todosShow.filter(todo => !todo.completed).length;
  const buttonClear = todosShow.filter(todo => todo.completed).length;

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {filterBy !== FilterBy.COMPLETED
          ? (`${todoLeft} items left`)
          : (`${buttonClear} items left`)}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={classNames(
            'filter__link',
            { selected: filterBy === FilterBy.ALL },
          )}
          onClick={() => setFilterBy(FilterBy.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames(
            'filter__link',
            { selected: filterBy === FilterBy.ACTIVE },
          )}
          onClick={() => setFilterBy(FilterBy.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames(
            'filter__link',
            { selected: filterBy === FilterBy.COMPLETED },
          )}
          onClick={() => setFilterBy(FilterBy.COMPLETED)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className={classNames(
          'todoapp__clear-completed',
          { opacity: buttonClear === 0 },
        )}
        onClick={deleteTodoCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
