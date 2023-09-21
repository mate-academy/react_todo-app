import React from 'react';
import classNames from 'classnames';

import { Todo } from '../types/Todo';
import { FilterBy } from '../utils/FilterBy';

type Props = {
  todos: Todo[];
  filterBy: FilterBy;
  filterTodos: (filterBy: FilterBy) => void;
};

export const TodoFooter: React.FC<Props> = ({
  todos,
  filterBy,
  filterTodos,
}) => {
  const uncompletedTodosLength = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${uncompletedTodosLength} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filterBy === FilterBy.All,
          })}
          onClick={() => filterTodos(FilterBy.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filterBy === FilterBy.Active,
          })}
          onClick={() => filterTodos(FilterBy.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filterBy === FilterBy.Completed,
          })}
          onClick={() => filterTodos(FilterBy.Completed)}
        >
          Completed
        </a>
      </nav>
    </footer>
  );
};
