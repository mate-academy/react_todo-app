import React, { useContext } from 'react';
import { Filter, FilterContext } from '../context/FilterProvider';
import classNames from 'classnames';
import { TodoContext } from '../context/TodoProvider';

type Props = {
  count: {
    active: number;
    completed: number;
  };
};

export const Footer: React.FC<Props> = ({ count: { completed, active } }) => {
  const { filter, setFilter } = useContext(FilterContext);
  const { setTodos } = useContext(TodoContext);

  const handleClearCompleted = () => {
    setTodos(prev => prev.filter(e => !e.completed));
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${active} items left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filter === Filter.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setFilter(Filter.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filter === Filter.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setFilter(Filter.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filter === Filter.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilter(Filter.Completed)}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={handleClearCompleted}
        disabled={completed === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};
