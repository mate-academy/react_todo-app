/* eslint-disable react/display-name */
import React, { useContext } from 'react';
import cn from 'classnames';
import { FilterBy } from '../../types/FilterBy';
import { TodoContext } from '../../contexts/TodoContext';

type Props = {};

export const Footer: React.FC<Props> = ({}) => {
  // console.log('render footer');
  const { todos, filterBy, setFilterBy, handleDeleteCompleted } =
    useContext(TodoContext);

  const notCompletedTodosCount = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {notCompletedTodosCount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: filterBy === FilterBy.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setFilterBy(FilterBy.All)}
        >
          All
        </a>

        <a
          href={`#/${FilterBy.Active}`}
          className={cn('filter__link', {
            selected: filterBy === FilterBy.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setFilterBy(FilterBy.Active)}
        >
          Active
        </a>

        <a
          href={`#/${FilterBy.Completed}`}
          className={cn('filter__link', {
            selected: filterBy === FilterBy.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilterBy(FilterBy.Completed)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={todos.every(todo => !todo.completed)}
        onClick={() => handleDeleteCompleted()}
      >
        Clear completed
      </button>
    </footer>
  );
};
