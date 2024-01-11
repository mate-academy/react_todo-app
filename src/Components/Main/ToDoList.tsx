import React from 'react';

import { TodoItem } from './TodoItem';
import { Todo } from '../../Types/Todo';

type Props = {
  items:Todo[]
};

export const TodoList: React.FC<Props> = ({ items }) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {items.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  );
};
