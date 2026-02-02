import React, { useContext } from 'react';
import { TodoContext } from '../context/todocontext';
import classNames from 'classnames';
import { FILTERS } from '../filters/filter';

export const TodoApp: React.FC = () => {
  const context = useContext(TodoContext);
  const {
    todo,
    handleActive,
    handleCompleted,
    handleFilterAll,
    filter,
    handleRemoveCompleted,
  } = context; // valor original

  const contagem = todo.filter(
    t => t.completed === false && t.title.length !== 0,
  );
  const tamanho = contagem.length;

  const hasCompleted = todo.some(t => t.completed === true);

  const { all, completed, active } = FILTERS;

  return (
    <>
      <span className="todo-count" data-cy="TodosCounter">
        {`${tamanho} item left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filter === 'all',
          })}
          data-cy="FilterLinkAll"
          onClick={() => handleFilterAll(all)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filter === 'active',
          })}
          data-cy="FilterLinkActive"
          onClick={() => handleActive(active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filter === 'completed',
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => handleCompleted(completed)}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        disabled={!hasCompleted}
        data-cy="ClearCompletedButton"
        onClick={() => handleRemoveCompleted()}
      >
        Clear completed
      </button>
    </>
  );
};
