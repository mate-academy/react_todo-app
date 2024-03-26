import React from 'react';
import classNames from 'classnames';
import { useAppSelector } from '../../app/hooks/useAppSelector';
import { Status, setStatus } from '../../app/features/todos';
import { useAppDispatch } from '../../app/hooks/useAppDispatch';

type Props = {
  onDeleteCompleted: () => Promise<void>,
};

export const Footer: React.FC<Props> = React.memo(({ onDeleteCompleted }) => {
  const dispatch = useAppDispatch();
  const { todos, status } = useAppSelector(state => state.todos);
  const todosLeft = todos.filter(todo => !todo.completed).length;
  const isComplitedTodos = todos.some(todo => todo.completed);

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${todosLeft} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: status === Status.All,
          })}
          onClick={() => dispatch(setStatus(Status.All))}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: status === Status.Active,
          })}
          onClick={() => dispatch(setStatus(Status.Active))}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: status === Status.Completed,
          })}
          onClick={() => dispatch(setStatus(Status.Completed))}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className={classNames('todoapp__clear-completed', {
          todo__status: !isComplitedTodos,
        })}
        onClick={() => onDeleteCompleted()}
      >
        Clear completed
      </button>
    </footer>
  );
});
