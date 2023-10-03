import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  items: Todo[]
};

export const TodoList: React.FC<Props> = ({ items }) => {
  return (
    <ul
      className="todo-list"
      data-cy="todoList"
    >
      {items.map((item: Todo) => {
        return (
          <TodoItem
            item={item}
            key={item.id}
          />
        );
      })}
    </ul>
  );
};
