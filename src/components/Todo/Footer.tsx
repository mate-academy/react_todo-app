import { FC, useContext, useState } from 'react';
import { Filter, Todo } from '../../types/todo';
import classNames from 'classnames';
import { DispatchContext, StateContext } from '../../context/Store';

type Props = {};
export const Footer: FC<Props> = () => {
  const dispatch = useContext(DispatchContext);
  const { todos } = useContext(StateContext);

  const [activeFilter, setActiveFilter] = useState<Filter>('all');

  const completedTodos = todos.filter(todo => todo.completed);
  const counter = todos.filter(todo => !todo.completed).length;

  function handleActiveFilter(filter: Filter) {
    setActiveFilter(filter);
    dispatch(filter);
  }

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {counter === 1 ? '1 item left' : `${counter} items left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: activeFilter === 'all',
          })}
          data-cy="FilterLinkAll"
          onClick={() => handleActiveFilter('all')}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: activeFilter === 'active',
          })}
          data-cy="FilterLinkActive"
          onClick={() => handleActiveFilter('active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: activeFilter === 'completed',
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => handleActiveFilter('completed')}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={() => dispatch({ type: 'clearCompletedTodo' })}
        disabled={completedTodos.length < 1}
      >
        Clear completed
      </button>
    </footer>
  );
};
