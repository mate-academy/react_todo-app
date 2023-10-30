import React from 'react';
import { Item } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  items: Item[]
};

export const TodoList: React.FC<Props> = ({ items }) => {
  return (
    <ul className="todo-list" data-cy="todosList">
      {items.map(item => (
        <TodoItem item={item} key={item.id} />
      ))}
    </ul>
  );
};
