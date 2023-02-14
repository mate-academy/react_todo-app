import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { Action } from '../enums/Action';
import { Filter } from '../enums/Filter';
import { ActionType } from '../types/ActionType';

type Props = {
  dispatch: React.Dispatch<ActionType>,
  unfinishedTodosLeft: number,
  isSomeFinished: boolean,
};

export const Footer: React.FC<Props> = ({
  dispatch,
  unfinishedTodosLeft,
  isSomeFinished,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${unfinishedTodosLeft} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <NavLink
          data-cy="FilterLinkAll"
          to="/all"
          className={({ isActive }) => classNames(
            'filter__link',
            { selected: isActive },
          )}
        >
          {Filter.ALL}
        </NavLink>

        <NavLink
          data-cy="FilterLinkActive"
          to="/active"
          className={({ isActive }) => classNames(
            'filter__link',
            { selected: isActive },
          )}
        >
          {Filter.ACTIVE}
        </NavLink>

        <NavLink
          data-cy="FilterLinkCompleted"
          to="/completed"
          className={({ isActive }) => classNames(
            'filter__link',
            { selected: isActive },
          )}
        >
          {Filter.COMPLETED}
        </NavLink>
      </nav>

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
        style={{
          visibility: !isSomeFinished ? 'hidden' : 'visible',
        }}
        onClick={() => dispatch({ type: Action.CLEAR })}
      >
        Clear completed
      </button>
    </footer>
  );
};
