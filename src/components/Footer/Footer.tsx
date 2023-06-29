import React from 'react';
import cn from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { Status } from '../../types/Status';
import { LocationEnum } from '../../types/LocationEnum';

type Props = {
  itemsLeftCount: number,
  onDeleteCompletedTodo: () => Promise<void>,
  isAnyTodoCompleted: boolean,
};

export const Footer: React.FC<Props> = ({
  itemsLeftCount,
  onDeleteCompletedTodo,
  isAnyTodoCompleted,
}) => {
  const location = useLocation();

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${itemsLeftCount} `}
        items left
      </span>

      <nav className="filter">
        <Link
          to="/"
          className={
            cn(
              'filter__link',
              { selected: location.pathname === LocationEnum.all },
            )
          }
          data-type={Status.default}
        >
          All
        </Link>

        <Link
          to="active"
          className={
            cn(
              'filter__link',
              { selected: location.pathname === LocationEnum.active },
            )
          }
          data-type={Status.active}
        >
          Active
        </Link>

        <Link
          to="completed"
          className={
            cn(
              'filter__link',
              { selected: location.pathname === LocationEnum.completed },
            )
          }
          data-type={Status.completed}
        >
          Completed
        </Link>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        onClick={onDeleteCompletedTodo}
        style={{ visibility: !isAnyTodoCompleted ? 'hidden' : 'visible' }}
      >
        Clear completed
      </button>
    </footer>
  );
};
