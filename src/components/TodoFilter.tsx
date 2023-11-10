import React, { useContext } from 'react';
import cn from 'classnames';
import { DispatchContext, StateContext } from './Store';
import { ActionType } from '../Type/Type';
import { FilterContext } from './FilterContext';

export const TodoFilter: React.FC = () => {
  const state = useContext(StateContext);

  const dispatch = useContext(DispatchContext);
  const { filter, setFilter } = useContext(FilterContext);
  const selectActiv = ():void => {
    setFilter(() => {
      return { all: false, active: true, completed: false };
    });
  };

  const selectAll = ():void => {
    setFilter(() => {
      return { all: true, active: false, completed: false };
    });
  };

  const selectCompleted = ():void => {
    setFilter(() => {
      return { all: false, active: false, completed: true };
    });
  };

  const clearCompleted = () => {
    dispatch(
      { type: ActionType.clearcompleted },
    );
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${state.filter(item => item.completed === false).length} items left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={cn({
              selected: filter.all,
            })}
            onClick={selectAll}
          >
            All

          </a>
        </li>

        <li>
          <a
            className={cn({
              selected: filter.active,
            })}
            onClick={selectActiv}
            href="#/active"
          >
            Active

          </a>
        </li>

        <li>
          <a
            className={cn({
              selected: filter.completed,
            })}
            href="#/completed"
            onClick={selectCompleted}
          >
            Completed

          </a>
        </li>
      </ul>
      {state.some(item => item.completed === true) && (
        <button
          type="button"
          className="clear-completed"
          onClick={(event) => {
            event.preventDefault();
            clearCompleted();
          }}
        >
          Clear completed
        </button>
      )}

    </footer>
  );
};
