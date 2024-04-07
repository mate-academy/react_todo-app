import React, { useContext } from 'react';
import { Query } from '../../enums/Query';
import classNames from 'classnames';
import { getTodosFromLocalStorage } from '../../utils/getTodosFromLocalStorage';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../../contexts/TodoContext';
import { Action } from '../../enums/Action';

type Props = {
  query: Query;
  setQuery: React.Dispatch<React.SetStateAction<Query>>;
};

export const Footer: React.FC<Props> = ({ query, setQuery }) => {
  const { dispatch } = useContext(TodosContext);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {
          getTodosFromLocalStorage().filter((todo: Todo) => !todo.isCompleted)
            .length
        }{' '}
        items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: query === Query.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setQuery(Query.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: query === Query.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setQuery(Query.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: query === Query.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setQuery(Query.Completed)}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={() => dispatch({ type: Action.clearAllCompleted })}
      >
        Clear completed
      </button>
    </footer>
  );
};
