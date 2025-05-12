import React from 'react';
import { Todo } from '../types/Todo';
import { Filter } from '../types/Filter';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  setFilter: (value: Filter) => void;
  deleteCompletedToDos: (onDelete?: () => void) => void;
  filter: Filter;
  mainInputRef: React.RefObject<HTMLInputElement>;
};

export const Footer: React.FC<Props> = ({
  todos,
  setFilter,
  filter,
  deleteCompletedToDos,
  mainInputRef,
}) => {
  if (todos.length > 0) {
    return (
      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="TodosCounter">
          {`${todos.filter(todo => !todo.completed).length} items left`}
        </span>

        <nav className="filter" data-cy="Filter">
          {Object.values(Filter).map(filterValue => (
            <a
              key={filterValue}
              href="#/"
              className={classNames('filter__link', {
                selected: filter === filterValue,
              })}
              data-cy={`FilterLink${filterValue}`}
              onClick={() => setFilter(filterValue)}
            >
              {filterValue}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
          onClick={() =>
            deleteCompletedToDos(() => {
              if (mainInputRef.current) {
                mainInputRef.current.focus();
              }
            })
          }
          disabled={todos.every(todo => !todo.completed)}
        >
          Clear completed
        </button>
      </footer>
    );
  }

  return null;
};
