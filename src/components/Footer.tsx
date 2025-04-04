import React, { useContext } from 'react';
import cn from 'classnames';
import { TodoStatus } from '../types/TodoStatus';
import { TodosContext } from '../Contexts/TodosContext';

export const Footer: React.FC = ({}) => {
  const { filterStatus, setFilterStatus, todos, clearAllCompletedTodos } =
    useContext(TodosContext);

  const isCompletedInTodos = todos.some(todo => todo.completed);

  const itemsLeft = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {itemsLeft} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: filterStatus === TodoStatus.all,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setFilterStatus(TodoStatus.all)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: filterStatus === TodoStatus.active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setFilterStatus(TodoStatus.active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: filterStatus === TodoStatus.completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilterStatus(TodoStatus.completed)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!isCompletedInTodos}
        onClick={clearAllCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};
