import React, { useContext } from 'react';
import { TodosContext } from '../../context';
import { Filter } from '../../enums/Filter';
import classNames from 'classnames';

export const TodoFooter: React.FC = () => {
  // #regions vars from contexts

  const { todos, activeTodos, filter, setFilter, deleteHandler } =
    useContext(TodosContext);

  // #endregion
  // #region handlers

  const deleteCompleted = () => {
    const idsToDelete: number[] = [];

    todos.forEach(todo => {
      const { completed, id } = todo;

      if (completed) {
        idsToDelete.push(id);
      }
    });

    deleteHandler(idsToDelete);
  };

  // #endregion

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodos} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filter === Filter.all,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setFilter(Filter.all)}
        >
          {Filter.all}
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filter === Filter.active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setFilter(Filter.active)}
        >
          {Filter.active}
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filter === Filter.completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilter(Filter.completed)}
        >
          {Filter.completed}
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={activeTodos === todos.length}
        onClick={deleteCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
