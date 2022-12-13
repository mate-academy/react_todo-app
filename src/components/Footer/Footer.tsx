import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';
import { Filter } from '../Filter';

type Props = {
  todosLeft: Todo[];
  completedTodos: Todo[],
  removeCompletedTodos: () => void;
};

export const Footer:React.FC<Props> = ({
  todosLeft,
  completedTodos,
  removeCompletedTodos,
}) => {
  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todosLeft.length} items left`}
      </span>

      <Filter />

      <button
        type="button"
        className={classNames(
          'clear-completed',
          { hidden: !completedTodos.length },
        )}
        onClick={removeCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};
