import classNames from 'classnames';
import React from 'react';
import { Todo } from '../types/todo';
import { statusChanger } from '../utils/functions';

type Props = {
  todos: Todo[];
  todoUpdater: (prevState: Todo[]) => void;
};

export const ToggleAllTodos: React.FC<Props> = ({ todos, todoUpdater }) => {
  const uncompleted = todos.filter(todo => !todo.completed);

  const handleAllCompleted = () => {
    return uncompleted.length
      ? todoUpdater(statusChanger(todos, false))
      : todoUpdater(statusChanger(todos, true));
  };

  return (
    <button
      type="button"
      className={classNames(
        'todoapp__toggle-all',
        {
          active: uncompleted.length === 0,
          'todoapp__toggle-all--hidden': !todos.length,
        },
      )}
      aria-label="Toggle All"
      onClick={handleAllCompleted}
    />
  );
};
