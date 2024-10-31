import React, { useCallback, useContext, useMemo } from 'react';
import cn from 'classNames';

import { Status } from '../../types/Status';
import { DispatchContext, StateContext } from '../../Store';
import { ErrorMessage } from '../../types/ErrorMessage';
import { onAutoCloseNotification } from '../../utils/autoCloseNotification';

export const TodoFilter: React.FC = () => {
  const { todos, status } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const onSetStatus = useCallback(
    (event: React.MouseEvent) => {
      const a = event.target as HTMLAnchorElement;
      const statusValue =
        (a.getAttribute('href')?.replace('#/', '') as Status) || Status.all;

      dispatch({ type: 'filterStatus', status: statusValue });
    },
    [dispatch],
  );

  const completedTodos = useMemo(() => {
    const completed = todos.filter(todo => todo.completed).length;

    return completed;
  }, [todos]);
  const todosCounter = useMemo(() => {
    const notCompletedTodos = todos.filter(todo => !todo.completed).length;
    const message =
      notCompletedTodos === 1
        ? `${notCompletedTodos} item left`
        : `${notCompletedTodos} items left`;

    return message;
  }, [todos]);

  const isActiveButton = useCallback(
    (value: string) => value === status,
    [status],
  );

  const capitalize = useCallback((word: string) => {
    if (!word) {
      return '';
    }

    return word[0].toUpperCase() + word.slice(1).toLowerCase();
  }, []);

  const handleClearCompleted = async () => {
    const completedIds = todos
      .filter(todo => todo.completed)
      .map(todo => todo.id);

    dispatch({ type: 'startAction', selectedTodo: completedIds });

    try {
      dispatch({ type: 'deletingSuccesses' });
    } catch {
      dispatch({ type: 'failure', errorMessage: ErrorMessage.delete });
      onAutoCloseNotification(dispatch);
    } finally {
      dispatch({ type: 'reset' });
    }
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todosCounter}
      </span>

      <nav className="filter" data-cy="Filter" onClick={onSetStatus}>
        {Object.values(Status).map(statusValue => (
          <a
            href={`#/${statusValue}`}
            className={cn('filter__link', {
              selected: isActiveButton(statusValue),
            })}
            data-cy={`FilterLink${capitalize(statusValue)}`}
            key={statusValue}
          >
            {capitalize(statusValue)}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={handleClearCompleted}
        disabled={completedTodos === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};
