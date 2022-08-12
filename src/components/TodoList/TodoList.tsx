/* eslint-disable jsx-a11y/control-has-associated-label */

import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[] | null,
  onChange: (value: boolean, todoId: number) => void,
  onDelete: (todoId: number) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  onChange,
  onDelete,
}) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {todos?.map(todo => (
        <TodoItem
          todo={todo}
          onChange={onChange}
          key={todo.id}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};
