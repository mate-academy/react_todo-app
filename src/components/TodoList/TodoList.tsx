import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

interface Props {
  items: Todo[];
}

export const TodoList: React.FC<Props> = React.memo(({ items }) => {
  return (
    <ul className="todo-list" data-cy="todosList">
      {items.map(item => <TodoItem key={item.id} item={item} />)}
    </ul>
  );
});
