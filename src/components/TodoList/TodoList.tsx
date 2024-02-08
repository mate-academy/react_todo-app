import React, { memo, useMemo } from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';
import { Status } from '../../types/Status';

type Props = {
  todos: Todo[],
  filter: Status,
};

function filterTodos(todos: Todo[], filter: Status) {
  switch (filter) {
    case 'active':
      return todos.filter(todo => !todo.completed);
    case 'completed':
      return todos.filter(todo => todo.completed);

    default:
      return todos;
  }
}

export const TodoList: React.FC<Props> = memo(({ todos, filter }) => {
  const filteredTodos = useMemo(
    () => filterTodos(todos, filter),
    [todos, filter],
  );

  return (
    <ul className="todo-list" data-cy="todosList">
      {filteredTodos.map(todo => (<TodoItem todo={todo} key={todo.id} />))}
    </ul>
  );
});
