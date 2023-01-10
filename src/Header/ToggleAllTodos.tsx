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
    return todoUpdater(statusChanger(todos, !uncompleted.length));
  };

  return (
    <label
      className={classNames(
        'todoapp__toggle-all-label',
        {
          active: uncompleted.length === 0,
          'todoapp__toggle-all-label--hidden': !todos.length,
        },
      )}
    >
      <input
        type="checkbox"
        data-cy="toggleAll"
        className="todoapp__toggle-all"
        aria-label="Toggle All"
        onClick={handleAllCompleted}
      />
    </label>
  );
};
