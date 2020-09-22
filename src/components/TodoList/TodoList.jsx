import React from 'react';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList = ({ todos }) => {

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <li key={todo.id}>
          <TodoItem todo={todo} />
        </li>
      ))}
    </ul>
  );
};
