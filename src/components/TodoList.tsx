import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

interface Props {
  todos: Todo[],
}

export const TodoList: React.FC<Props> = React.memo(({ todos }) => {
  return (
    <ul
      className="todo-list"
      data-cy="todosList"
    >
      {todos.map(todo => (
        <TodoItem
          todo={todo}
          key={todo.id}
        />
      ))}
    </ul>
  );
});
