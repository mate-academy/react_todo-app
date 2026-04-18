import React, { useContext } from 'react';
import { TodosContext } from '../context/TodosContext';
import classNames from 'classnames';

export const Footer: React.FC = () => {
  const { todos, filter, setFilter, dispatch } = useContext(TodosContext);
  const notCompletedCount = todos.filter(todo => !todo.completed).length;
  const completedTodoCount = todos.filter(todo => todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${notCompletedCount} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', { selected: filter === 'All' })}
          data-cy="FilterLinkAll"
          onClick={() => setFilter('All')}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filter === 'Active',
          })}
          data-cy="FilterLinkActive"
          onClick={() => setFilter('Active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filter === 'Completed',
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilter('Completed')}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={() => {
          const comletedTodos = todos.filter(todo => todo.completed === true);

          dispatch({ type: 'delete', payload: comletedTodos });
        }}
        disabled={completedTodoCount === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};
