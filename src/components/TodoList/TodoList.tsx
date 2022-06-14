/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { Todo } from '../../types';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  items: Todo[],
  removeTodo: (todoId: number) => void,
  changeStatus: (todoId: number) => void,
  editTitle: (newTitle: string, todoId: number) => void,
};

export const TodoList: React.FC<Props> = React.memo(({
  items,
  removeTodo,
  changeStatus,
  editTitle,
}) => (
  <ul className="todo-list">
    {items.map(todo => (
      <TodoItem
        key={todo.id}
        todo={todo}
        removeTodo={removeTodo}
        changeStatus={changeStatus}
        editTitle={editTitle}
      />
    ))}
  </ul>
));
