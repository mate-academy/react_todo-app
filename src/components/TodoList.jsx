import React from 'react';
// eslint-disable-next-line import/no-cycle
import { TodoItem } from './TodoItem';

export const TodoList = ({ items }) => (
  <ul className="todo-list">
    {items.map(item => (
      <React.Fragment key={item.id}>
        <TodoItem item={item} />
      </React.Fragment>
    ))}
  </ul>
);
