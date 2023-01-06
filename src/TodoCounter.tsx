import React from 'react';
import { Todo } from './types/todo';

type Props = {
  todos: Todo[];
};

export const TodoCounter: React.FC<Props> = ({ todos }) => {
  const uncompletedLength = todos.filter(todo => !todo.completed).length;

  return (
    <span className="todoapp__todo-count" data-cy="todosCounter">
      {`${uncompletedLength} items left`}
    </span>
  );
};
