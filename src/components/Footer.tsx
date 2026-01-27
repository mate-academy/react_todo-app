import cn from 'classnames';
import { useDispatchTodos, useSetTodos } from '../context/TodoContext';
import { Filter } from '../types/Filter';
import React from 'react';

export const Footer: React.FC = () => {
  const dispatch = useDispatchTodos();
  const { todos, filter } = useSetTodos();

  if (todos.length === 0) {
    return null;
  }

  const hasNoCompeted = todos.filter(todo => !todo.completed).length;
  const todosCompleted = todos.some(todo => todo.completed);

  const handleFilterChange = (newFilter: Filter) => {
    dispatch({
      type: 'setFilter',
      payload: newFilter,
    });
  };

  const clearCompeleted = () => {
    dispatch({
      type: 'clearCompleted',
    });
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {hasNoCompeted} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link ', { selected: filter === 'all' })}
          data-cy="FilterLinkAll"
          onClick={() => handleFilterChange('all')}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', { selected: filter === 'active' })}
          data-cy="FilterLinkActive"
          onClick={() => handleFilterChange('active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', { selected: filter === 'completed' })}
          data-cy="FilterLinkCompleted"
          onClick={() => handleFilterChange('completed')}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!todosCompleted}
        onClick={clearCompeleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
