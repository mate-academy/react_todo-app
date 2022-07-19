/* eslint-disable no-console */
import React from 'react';
import { TodoItem } from './TodoItem';

export const TodoList = ({ todos }) => (

  <ul className="todo-list">
    {todos.map(item => (
      <TodoItem item={item} key={item.id} />
    ))}
  </ul>
);
