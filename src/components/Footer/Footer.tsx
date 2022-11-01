import React from 'react';
import classnames from 'classnames';
import { Todo } from '../../types/Todo';
import { FilterType } from '../../types/FilterType';

type Props = {
  todos: Todo[],
  filter: string,
  onFilterSelect: (filterType: string) => void,
};

export const Footer: React.FC<Props> = ({
  todos,
  filter,
  onFilterSelect,
}) => {
  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todos.filter(todo => !todo.completed).length} items left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={
              classnames(
                { selected: filter === FilterType.All },
              )
            }
            onClick={() => onFilterSelect(FilterType.All)}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={
              classnames(
                { selected: filter === FilterType.Active },
              )
            }
            onClick={() => onFilterSelect(FilterType.Active)}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={
              classnames(
                { selected: filter === FilterType.Completed },
              )
            }
            onClick={() => onFilterSelect(FilterType.Completed)}
          >
            Completed
          </a>
        </li>
      </ul>

      <button type="button" className="clear-completed">
        {todos.some(todo => todo.completed) && 'Clear completed'}
      </button>
    </footer>
  );
};
