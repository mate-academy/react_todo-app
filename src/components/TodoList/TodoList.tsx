import React, { memo, useMemo } from 'react';
import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[],
  filter: Status,
};

function filterTodos(todos: Todo[], filter: Status) {
  switch (filter) {
    case Status.Active:
      return todos.filter(todo => !todo.completed);
    case Status.Completed:
      return todos.filter(todo => todo.completed);

    default:
      return todos;
  }
}

export const TodoList: React.FC<Props> = memo(({ todos, filter }) => {
  const currentTodos = useMemo(
    () => filterTodos(todos, filter),
    [todos, filter],
  );

  return (
    <ul className="todo-list" data-cy="todosList">
      {currentTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
});
