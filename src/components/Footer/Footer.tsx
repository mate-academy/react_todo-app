import React from 'react';
import cn from 'classnames';
import { Status } from '../../types/Status';

type Props = {
  selectedStatus: Status,
  onHandleStatus:React.MouseEventHandler<HTMLAnchorElement>,
  itemsLeftCount: number,
  onDeleteCompletedTodo: () => Promise<void>,
  isAnyTodoCompleted: boolean,
};

export const Footer: React.FC<Props> = ({
  selectedStatus,
  onHandleStatus,
  itemsLeftCount,
  onDeleteCompletedTodo,
  isAnyTodoCompleted,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${itemsLeftCount} `}
        items left
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={
            cn(
              'filter__link',
              { selected: selectedStatus === Status.default },
            )
          }
          data-type={Status.default}
          onClick={onHandleStatus}
        >
          All
        </a>

        <a
          href="#/active"
          className={
            cn(
              'filter__link',
              { selected: selectedStatus === Status.active },
            )
          }
          onClick={onHandleStatus}
          data-type={Status.active}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={
            cn(
              'filter__link',
              { selected: selectedStatus === Status.completed },
            )
          }
          onClick={onHandleStatus}
          data-type={Status.completed}
        >
          Completed
        </a>
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
