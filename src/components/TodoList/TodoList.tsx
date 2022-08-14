/* eslint-disable jsx-a11y/control-has-associated-label */

import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[] | null,
  onChange: (value: boolean, todoId: number) => void,
  onDelete: (todoId: number) => void,
  onEdit: (value: string, todoId: number) => void,
};

export const TodoList: React.FC<Props> = React.memo(({
  todos,
  onChange,
  onDelete,
  onEdit,
}) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {todos?.map(todo => (
        <TodoItem
          todo={todo}
          onChange={onChange}
          key={todo.id}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
});
