import { DispatchContext, StateContext } from '../../store/store';

import cn from 'classnames';
import { useContext } from 'react';
import { Status } from '../../Types/Status';

const Footer = () => {
  const dispatch = useContext(DispatchContext);
  const { todos, status } = useContext(StateContext);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todos.length} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: status === Status.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => dispatch({ type: Status.All })}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: status === Status.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => dispatch({ type: Status.Active })}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: status === Status.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => dispatch({ type: Status.Completed })}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={() => dispatch({ type: 'clear-completed' })}
      >
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
