import React from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import { Todo } from '../../types/Todo';

type Props = {
  visibleTodos: Todo[],
};

export const TodoList: React.FC<Props> = React.memo((
  { visibleTodos },
) => (
  <ul className="todo-list" data-cy="todoList">
    {visibleTodos.map(todo => (
      <TodoItem key={todo.id} todo={todo} />
    ))}
  </ul>
));
