import React from 'react';
import classNames from 'classnames';
import { patchTodo } from '../api/todos';
import { Error } from '../types/ErrorEnum';
import { Todo } from '../types/Todo';
import { statusChanger } from '../utils/functions';

type Props = {
  todos: Todo[];
  todoUpdater: (prevState: Todo[]) => void;
  errorNotification: (err: Error) => void;
};

export const ToggleAllTodos: React.FC<Props> = ({
  todos,
  todoUpdater,
  errorNotification,
}) => {
  const uncompleted = todos.filter(todo => !todo.completed);

  const toggleAllPatcher = (choosenTodos: Todo[]) => {
    choosenTodos.map(async ({ id }) => {
      await patchTodo(id, { completed: !!uncompleted.length });
    });
  };

  const handleAllCompleted = async () => {
    try {
      if (!uncompleted.length) {
        toggleAllPatcher(todos);
      } else {
        toggleAllPatcher(uncompleted);
      }

      todoUpdater(statusChanger(todos, !uncompleted.length));
    } catch (error) {
      errorNotification(Error.UPDATE);
    }
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
