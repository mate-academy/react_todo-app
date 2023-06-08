import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
};

export const TodoCount: React.FC<Props> = ({ todos }) => {
  const activeTodos = todos.filter(todo => todo.completed === false);

  return (
    <span className="todo-count" data-cy="todosCounter">
      {`${activeTodos.length} items left`}
    </span>
  );
};
