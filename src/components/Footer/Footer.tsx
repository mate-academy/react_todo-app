import classNames from 'classnames';
import '../../styles/todoapp.scss';
import { Query } from '../../types/Query';
import { DispatchContext, StateContext } from '../../Store';
import { useContext } from 'react';

const FILTER_VALUES: Query[] = ['All', 'Active', 'Completed'];

export const Footer = () => {
  const dispatch = useContext(DispatchContext);
  const { todos, query } = useContext(StateContext);

  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.length - activeCount;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeCount} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {FILTER_VALUES.map(filterValue => (
          <a
            key={filterValue}
            href={
              filterValue !== 'All'
                ? `#/${filterValue.toLocaleLowerCase()}`
                : '#/'
            }
            className={classNames('filter__link', {
              selected: query === filterValue,
            })}
            data-cy={`FilterLink${filterValue}`}
            onClick={() => dispatch({ type: 'setQuery', query: filterValue })}
          >
            {filterValue}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={() => dispatch({ type: 'clearCompleted' })}
        disabled={completedCount === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};
