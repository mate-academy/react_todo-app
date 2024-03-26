import { OrderItems } from '../types/Type';
import React from 'react';
import { TodoItem } from './TodoItem';

interface Props {
  items: OrderItems[];
}

export const TodoList: React.FC<Props> = ({ items }) => {
  return (
    <ul className="todo-list" data-cy="todosList">
      {items.map(item => (
        <TodoItem key={item.id} todo={item} />
      ))}
    </ul>
  );
};
