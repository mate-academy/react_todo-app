import React from 'react';
import cn from 'classnames';

import { StateContext, DispatchContext } from './GlobalStateProvider';

import { setFilter } from '../services/SetFilter';
import { handeClearCompletedTodos } from '../services/ClearTodos';

import { Href } from '../types/Href';

const filterHrefs: { [key in Filters]: Href } = {
  all: '#/',
  active: '#/active',
  completed: '#/completed',
};

enum Filters {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

const filters = Object.values(Filters) as Filters[];

export const Footer: React.FC = () => {
  const { todos, filter } = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext);

  const handlerClearTodosClick = () => {
    handeClearCompletedTodos(dispatch);
  };

  return (
    <>
      {!!todos.length && (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {todos.filter(todo => !todo.completed).length} items left
          </span>

          <nav className="filter" data-cy="Filter">
            {filters.map(currFilter => (
              <a
                key={currFilter}
                href={filterHrefs[currFilter]}
                className={cn('filter__link', {
                  selected: filter === currFilter,
                })}
                data-cy={`FilterLink${currFilter.charAt(0).toUpperCase() + currFilter.slice(1)}`}
                onClick={() => setFilter(filter, dispatch)}
              >
                {currFilter}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
            onClick={handlerClearTodosClick}
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};
