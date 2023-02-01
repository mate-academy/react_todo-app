import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';
import { Filter } from '../Filter';

type Props = {
  activeTodosCount: number,
  clearCompletedTodos: () => void,
  todosFromServer: Todo[],
};

export const Footer: React.FC<Props> = React.memo(
  ({
    todosFromServer,
    activeTodosCount,
    clearCompletedTodos,
  }) => {
    const completedTodosCount = todosFromServer.length - activeTodosCount;

    return (
      <footer
        className={classNames(
          'todoapp__footer',
          { hidden: todosFromServer.length === 0 },
        )}
        data-cy="Footer"
      >
        <span className="todo-count" data-cy="todosCounter">
          {`${activeTodosCount} items left`}
        </span>

        <Filter />

        <button
          data-cy="ClearCompletedButton"
          type="button"
          className={classNames(
            'todoapp__clear-completed',
            { hidden: completedTodosCount === 0 },
          )}
          onClick={clearCompletedTodos}
        >
          Clear completed
        </button>
      </footer>
    );
  },
);
