import React, { useContext } from 'react';
import { FILTER } from '../../types/Filter';
import { DispatchContext, StateContext } from '../GlobalContext/GlobalContext';
import { Action } from '../../types/Actions';
import { Todo } from '../../types/Todo';

export const Footer: React.FC = () => {
  const { todos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const handleFilteredAll = () => {
    dispatch({ type: Action.filterTodo, payload: FILTER.ALL });
  };

  const handleFilteredActive = () => {
    dispatch({ type: Action.filterTodo, payload: FILTER.ACTIVE });
  };

  const handleFilteredCompleted = () => {
    dispatch({ type: Action.filterTodo, payload: FILTER.COMPLETED });
  };

  const handleClearCompleted = () => {
    todos.forEach(todo =>
      todo.completed === true
        ? dispatch({ type: Action.clearTodo, payload: todo.id })
        : todo,
    );
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${todos.filter((todo: Todo) => todo.completed === false).length}
        items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className="filter__link selected"
          data-cy="FilterLinkAll"
          onClick={handleFilteredAll}
        >
          All
        </a>

        <a
          href="#/active"
          className="filter__link"
          data-cy="FilterLinkActive"
          onClick={handleFilteredActive}
        >
          Active
        </a>

        <a
          href="#/completed"
          className="filter__link"
          data-cy="FilterLinkCompleted"
          onClick={handleFilteredCompleted}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
