import React from 'react';
import { TodoItem } from '../TodoItem';
import { Todos } from '../../types/Todos';

type Props = {
  items: Todos;
};

export const TodoList: React.FC<Props> = ({ items }) => {
  return (
    <ul className="todo-list" data-cy="todosList">
      {items.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};
