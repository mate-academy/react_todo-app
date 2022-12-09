import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../../types/Todo';

type Props = {
  todos: Todo[];
  activeTodos: Todo[];
  completedTodos: Todo[];
  handleUpdateTodo: (updatedTodo: Todo) => Promise<void>
};

export const ToggleAllButton: React.FC<Props> = React.memo(({
  todos,
  activeTodos,
  completedTodos,
  handleUpdateTodo,
}) => {
  const handleToggleAllButton = () => {
    const allCompleted = activeTodos.length === 0;
    const todosToToggle = allCompleted ? completedTodos : activeTodos;

    todosToToggle.forEach(todo => {
      handleUpdateTodo({ ...todo, completed: !allCompleted });
    });
  };

  return (
    <>
      {todos.length > 0 && (
        <button
          data-cy="toggleAll"
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: activeTodos.length === 0,
          })}
          aria-label="ToggleAllButton"
          onClick={handleToggleAllButton}
        />
      )}
    </>
  );
});
