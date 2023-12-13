import React from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import { Todo } from '../../types/Todo';

type Props = {
  items: Todo[];
};

export const TodoList: React.FC<Props> = ({ items }) => {
  return (
    <ul className="todo-list" data-cy="todosList">
      {items.map(item => (
        <TodoItem key={item.id} todo={item} />
      ))}
    </ul>
  );
};
