import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
};

export const TodoCount: React.FC<Props> = ({ todos }) => {
  const activeTodosQty = todos.filter(todo => !todo.completed).length;

  return (
    <span className="todoapp__todo-count" data-cy="todosCounter">
      {`${activeTodosQty} items left`}
    </span>
  );
};
