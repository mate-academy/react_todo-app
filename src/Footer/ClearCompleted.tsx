import React from 'react';
import { deleteTodo } from '../api/todos';
import { Error } from '../types/ErrorEnum';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
  todosUpdater: (prevState: Todo[]) => void;
  errorNotification: (err: Error) => void;
};

export const ClearCompleted: React.FC<Props> = ({
  todos,
  todosUpdater,
  errorNotification,
}) => {
  const completedTodos = todos.filter(todo => todo.completed);

  const handleCompletedDel = async () => {
    try {
      completedTodos.map(async ({ id }) => {
        await deleteTodo(id);
      });

      todosUpdater(todos.filter(todo => !todo.completed));
    } catch (error) {
      errorNotification(Error.UPDATE);
    }
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
