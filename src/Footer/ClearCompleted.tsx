import React from 'react';
// import classNames from 'classnames';
import { Todo } from '../types/todo';

type Props = {
  todos: Todo[];
  todosUpdater: (prevState: Todo[]) => void;
};

export const ClearCompleted: React.FC<Props> = ({
  todos,
  todosUpdater,
}) => {
  const handleCompletedDel = () => {
    return todosUpdater(todos.filter(todo => !todo.completed));
  };

  return (
    <button
      type="button"
      data-cy="clearCompleted"
      className="todoapp__clear-completed"
      onClick={handleCompletedDel}
    >
      Clear completed
    </button>
  );
};
