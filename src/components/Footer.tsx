import React from 'react';
import cn from 'classnames';

import { StateContext, DispatchContext } from './GlobalStateProvider';

import { setFilter } from '../services/SetFilter';
import { handeClearCompletedTodos } from '../services/ClearTodos';

import { Filter } from '../types/Filter';
import { Href } from '../types/Href';

const filterHrefs: { [key in Filter]: Href } = {
  all: '#/',
  active: '#/active',
  completed: '#/completed',
};

export const Footer: React.FC = () => {
  const { todos, filter } = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext);

  const handlerClearTodosClick = () => {
    handeClearCompletedTodos(dispatch);
  };

  return (
    <>
      {todos.length !== 0 && (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {todos.filter(todo => !todo.completed).length} items left
          </span>

          <nav className="filter" data-cy="Filter">
            {(['all', 'active', 'completed'] as Filter[]).map(f => (
              <a
                key={f}
                href={filterHrefs[f]}
                className={cn('filter__link', {
                  selected: filter === f,
                })}
                data-cy={`FilterLink${f.charAt(0).toUpperCase() + f.slice(1)}`}
                onClick={() => setFilter(f, dispatch)}
              >
                {f}
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
