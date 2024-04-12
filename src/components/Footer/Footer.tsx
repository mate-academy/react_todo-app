import React, { useContext } from 'react';
import classNames from 'classnames';
import { TodoContext } from '../../TodoContext';
import { SortType } from '../../types/SortType';

type Props = {};

export const Footer: React.FC<Props> = () => {
  const { todos, sortType, setSortType, setTodos } = useContext(TodoContext);

  if (todos.length === 0) {
    return <></>;
  }

  const completedTodos = todos.filter(todo => todo.completed);
  const notCompletedTodos = todos.filter(todo => !todo.completed);

  const handleClearCompleted = () => {
    setTodos(notCompletedTodos);
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${notCompletedTodos.length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: sortType === SortType.None,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setSortType(SortType.None)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: sortType === SortType.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setSortType(SortType.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: sortType === SortType.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setSortType(SortType.Completed)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className={'todoapp__clear-completed'}
        data-cy="ClearCompletedButton"
        onClick={handleClearCompleted}
        disabled={completedTodos.length === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};
