/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  items: Todo[],
};

export const TodoList: React.FC<Props> = ({ items }) => (
  <ul className="todo-list" data-cy="todosList">
    {items.map(item => (
      <TodoItem item={item} key={item.id} />
    ))}
  </ul>
);
