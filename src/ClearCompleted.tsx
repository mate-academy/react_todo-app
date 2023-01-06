import React from 'react';
import classNames from 'classnames';
import { Todo } from './types/todo';

type Props = {
  todos: Todo[];
  todosUpdater: (prevState: Todo[]) => void;
};

export const ClearCompleted: React.FC<Props> = ({
  todos,
  todosUpdater,
}) => {
  const someCompletedTodo = todos.filter(todo => todo.completed);

  const handleCompletedDel = () => {
    return todosUpdater(todos.filter(todo => !todo.completed));
  };

  return (
    <button
      type="button"
      className={classNames(
        'todoapp__clear-completed',
        { 'todoapp__clear-completed--hidden': !someCompletedTodo.length },
      )}
      onClick={handleCompletedDel}
    >
      Clear completed
    </button>
  );
};
