import React from 'react';
import { TodoContext } from '../contexts/TodoContext';
import cn from 'classnames';
import { FILTER_TYPE } from '../constants';

export const Footer: React.FC = () => {
  const { todos, filterBy, setFilterBy, handleClearCompletedTodos } =
    React.useContext(TodoContext);

  const unfinishedTodos = todos.filter(todo => !todo.completed).length;

  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${unfinishedTodos} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', { selected: filterBy === FILTER_TYPE.ALL })}
          data-cy="FilterLinkAll"
          onClick={() => setFilterBy(FILTER_TYPE.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', { selected: filterBy === FILTER_TYPE.ACTIVE })}
          data-cy="FilterLinkActive"
          onClick={() => {
            setFilterBy(FILTER_TYPE.ACTIVE);
          }}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', { selected: filterBy === FILTER_TYPE.COMPLETED })}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilterBy(FILTER_TYPE.COMPLETED)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={completedTodos.length === 0}
        onClick={handleClearCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};
