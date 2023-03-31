import React, { useMemo } from 'react';
import { Todo } from '../types/Todo';
import { TodoFilter } from './TodoFilter';

type Props = {
  todos: Todo[];
  onRemoveAllCompletedTodos: () => void;
};

export const Footer: React.FC<Props> = ({
  todos,
  onRemoveAllCompletedTodos,
}) => {
  const notCompletedITodoLeft = useMemo(() => {
    return todos.filter(todo => !todo.completed);
  }, [todos]);

  const completedTodoLength = useMemo(() => {
    return todos.filter(todo => todo.completed).length;
  }, [todos]);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${notCompletedITodoLeft.length} items left`}
      </span>

      <TodoFilter />

      {!!completedTodoLength && (
        <button
          type="button"
          className="clear-completed"
          onClick={onRemoveAllCompletedTodos}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
