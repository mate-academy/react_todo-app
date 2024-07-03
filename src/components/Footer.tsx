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
          {itemLeft.length} item{itemLeft.length > 1 && 's'} left
        </span>

        {/* Active link should have the 'selected' class */}
        <nav className="filter" data-cy="Filter">
          <a
            href="#/"
            className={classNames('filter__link', {
              ['selected']: activeFilter === 'filterAll',
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
              ['selected']: activeFilter === 'filterActive',
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
              ['selected']: activeFilter === 'filterCompleted',
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

        {/* this button should be disabled if there are no completed todos */}
        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
          onClick={() => {
            dispatch({ type: 'clearAll' });
          }}
        >
          Clear completed
        </button>
      </footer>
    </>
  );
};
