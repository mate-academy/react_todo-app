import { memo } from 'react';

import { Todo } from '../../types';
import { TodoItem } from '../TodoItem';

type Props = {
  items: Todo[];
};

export const TodoList: React.FC<Props> = memo(({ items }) => (
  <ul className="todo-list" data-cy="todosList">
    {items.map(item => (
      <TodoItem key={item.id} item={item} />
    ))}
  </ul>
));
