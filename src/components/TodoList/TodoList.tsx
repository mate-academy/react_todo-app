import React from 'react';
import { TodoItem } from '../TodoItem';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  onToggle: (todo: Todo) => void,
  onUpdate: (todoId: number, title: string) => void,
  onDelete: (todoId: number) => void,
};

export const TodoList: React.FC<Props> = React.memo(({
  todos,
  onToggle,
  onUpdate,
  onDelete,
}) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
});
