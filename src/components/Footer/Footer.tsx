import { DispatchContext, StateContext } from '../../store/store';

import cn from 'classnames';
import { useContext } from 'react';
import { Status } from '../../Types/Status';

const Footer = () => {
  const dispatch = useContext(DispatchContext);
  const { todos, status } = useContext(StateContext);

  const completedTodosCount = todos.filter(todo => todo.completed).length;
  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  const handleClearCompleted = () => {
    dispatch({ type: 'clear-completed' });
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} {activeTodosCount === 1 ? 'item' : 'items'} left
      </span>

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

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={handleClearCompleted}
        disabled={!completedTodosCount}
      >
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
