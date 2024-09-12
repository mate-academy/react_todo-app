import classNames from 'classnames';

import TodosContext from '../../contexts/Todos/TodosContext';
import FilterContext from '../../contexts/Filter/FilterContext';

import { Filter } from '../../enums';

export const Footer = () => {
  const { todos } = TodosContext.useState();
  const { clearCompleted } = TodosContext.useContract();

  const { filter } = FilterContext.useState();
  const { setFilter } = FilterContext.useContract();

  const isShown = todos.length !== 0;
  const isNoneCompleted = todos.every(todo => !todo.completed);

  const activeCount = todos.filter(({ completed }) => !completed).length;

  return (
    <>
      {isShown && (
        <>
          {/* Hide the footer if there are no todos */}
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {activeCount} items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                onClick={() => setFilter(Filter.All)}
                className={classNames('filter__link', {
                  selected: filter === Filter.All,
                })}
                data-cy="FilterLinkAll"
              >
                All
              </a>

              <a
                href="#/active"
                onClick={() => setFilter(Filter.Active)}
                className={classNames('filter__link', {
                  selected: filter === Filter.Active,
                })}
                data-cy="FilterLinkActive"
              >
                Active
              </a>

              <a
                href="#/completed"
                onClick={() => setFilter(Filter.Completed)}
                className={classNames('filter__link', {
                  selected: filter === Filter.Completed,
                })}
                data-cy="FilterLinkCompleted"
              >
                Completed
              </a>
            </nav>

            {/* this button should be disabled if there are no completed todos */}
            <button
              onClick={clearCompleted}
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={isNoneCompleted}
            >
              Clear completed
            </button>
          </footer>
        </>
      )}
    </>
  );
};
