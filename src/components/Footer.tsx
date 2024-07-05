import { useContext, useState } from 'react';
import classNames from 'classnames';
import { Filter } from '../types/Filter';
import { DispatchContext, TodosContext } from '../context/Store';

type Props = {};

export const Footer: React.FC<Props> = ({}) => {
  const todos = useContext(TodosContext);
  const dispatch = useContext(DispatchContext);
  const itemLeft = todos.filter(t => !t.completed);
  const [activeFilter, setActiveFilter] = useState<Filter>(Filter.All);

  return (
    <>
      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="TodosCounter">
          {itemLeft.length} items left
        </span>

        <nav className="filter" data-cy="Filter">
          <a
            href="#/"
            className={classNames('filter__link', {
              ['selected']: activeFilter === Filter.All,
            })}
            data-cy="FilterLinkAll"
            onClick={() => {
              setActiveFilter(Filter.All);
              dispatch({ type: 'filterList', payload: Filter.All });
            }}
          >
            All
          </a>

          <a
            href="#/active"
            className={classNames('filter__link', {
              ['selected']: activeFilter === Filter.Active,
            })}
            data-cy="FilterLinkActive"
            onClick={() => {
              setActiveFilter(Filter.Active);
              dispatch({ type: 'filterList', payload: Filter.Active });
            }}
          >
            Active
          </a>

          <a
            href="#/completed"
            className={classNames('filter__link', {
              ['selected']: activeFilter === Filter.Completed,
            })}
            data-cy="FilterLinkCompleted"
            onClick={() => {
              setActiveFilter(Filter.Completed);
              dispatch({ type: 'filterList', payload: Filter.Completed });
            }}
          >
            Completed
          </a>
        </nav>

        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
          onClick={() => {
            dispatch({ type: 'clearAll' });
          }}
          disabled={todos.every(t => !t.completed)}
        >
          Clear completed
        </button>
      </footer>
    </>
  );
};
