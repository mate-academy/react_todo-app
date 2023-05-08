import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  containsCompleted: boolean,
  onClearCompleted: () => void,
  itemsLeft: number,
};

export const Footer: FC<Props> = ({
  containsCompleted,
  onClearCompleted,
  itemsLeft,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${itemsLeft} items left`}
      </span>

      <nav className="filter">
        <NavLink
          to="/"
          className={({ isActive }) => classNames(
            'filter__link',
            { selected: isActive },
          )}
        >
          All
        </NavLink>

        <NavLink
          to="active"
          className={({ isActive }) => classNames(
            'filter__link',
            { selected: isActive },
          )}
        >
          Active
        </NavLink>

        <NavLink
          to="completed"
          className={({ isActive }) => classNames(
            'filter__link',
            { selected: isActive },
          )}
        >
          Completed
        </NavLink>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        style={{ visibility: containsCompleted ? 'visible' : 'hidden' }}
        onClick={onClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
