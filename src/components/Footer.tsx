import React from 'react';
import { useGlobalDispatch, useGlobalState } from '../store/Store';
import classNames from 'classnames';
import { ActionType } from '../enums/ActionTypes';
import { TodoFilter } from '../enums/TodoFilter';

type Props = {
  filter: TodoFilter;
  setFilter: (filter: TodoFilter) => void;
};

export const Footer: React.FC<Props> = ({ filter, setFilter }) => {
  const { todos } = useGlobalState();
  const dispatch = useGlobalDispatch();

  const activeTodoCount = todos.filter(todo => !todo.completed).length;
  const activeTodoCountLabel = `${activeTodoCount} ${activeTodoCount === 1 ? 'item' : 'items'} left`;

  const filterLinks = Object.values(TodoFilter).map(filterValue => (
    <a
      key={filterValue}
      href={`#/${filterValue}`}
      className={classNames('filter__link', {
        selected: filter === filterValue,
      })}
      data-cy={`FilterLink${filterValue.charAt(0).toUpperCase() + filterValue.slice(1)}`}
      onClick={() => setFilter(filterValue)}
    >
      {filterValue.charAt(0).toUpperCase() + filterValue.slice(1)}
    </a>
  ));

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodoCountLabel}
      </span>

      <nav className="filter" data-cy="Filter">
        {filterLinks}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={() => dispatch({ type: ActionType.CLEAR_COMPLETED })}
        disabled={todos.every(todo => !todo.completed)}
      >
        Clear completed
      </button>
    </footer>
  );
};
